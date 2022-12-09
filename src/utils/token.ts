import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export const generatTokens = (id: string) => {
    const jwtAccessToken = jwt.sign({ id, type: "AccessToken" }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    const jwtRefreshToken = jwt.sign({ id, type: "RefreshToken" }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { jwtAccessToken, jwtRefreshToken };
}
export const generateAccessToken = (id: string) => {
    const jwtAccessToken = jwt.sign({
        id, type: "AccessToken"
    }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    return { jwtAccessToken };
}
export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
}
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
}
