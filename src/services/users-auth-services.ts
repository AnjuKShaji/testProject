import { createDatabaseContext } from "../db";
import { comparePasswordHash, generateAccessToken, generatTokens, verifyRefreshToken } from "../utils";
import { AuthUserLogin, UserRefreshToken } from "../validations";

export class UsersAuthService {
    private readonly db = createDatabaseContext();
    async UserLogin({ email, password }: AuthUserLogin) {
        const users = await this.db.prisma.users.findUnique({
            where: {
                email
            }
        })
        if (!users) {
            return { message: 'email or password is incorrect', statusCode: 400 }
        }
        const isPasswordMatch = comparePasswordHash(password, users.password)
        if (!isPasswordMatch) {
            return { message: 'email or password is incorrect', statusCode: 400 }
        }
        const token = generatTokens(users.id)

        const tokenCount = await this.db.prisma.auth.count({
            where: {
                userId: users.id
            }
        })
        if (tokenCount > 0) {
            await this.db.prisma.auth.delete({
                where: {
                    userId: users.id
                }
            })
        }
        await this.db.prisma.auth.create({
            data: {
                userId: users.id,
                jwtRefreshToken: token.jwtRefreshToken
            }
        })

        return { ...token, statusCode: 200 };
    }
    async RefreshToken({ jwtRefreshToken }: UserRefreshToken) {
        const tokendata = verifyRefreshToken(jwtRefreshToken);
        if (!tokendata) {
            return { message: 'token is invalid', statusCode: 400 }
        }
        const auth = await this.db.prisma.auth.count({
            where: {
                jwtRefreshToken: jwtRefreshToken
            }
        })
        if (!auth) {
            return { message: 'token is invalid', statusCode: 400 }
        }
        //@ts-ignore
        const tokenData = generateAccessToken(tokendata?.id)
        return { ...tokenData, jwtRefreshToken, statusCode: 200 };
    }
}