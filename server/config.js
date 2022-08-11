import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
    // 동적으로 object에 접근해야하므로 process.env[key] 같이 적고
    // 만일 우리가 지정한 키가 env에 있다면 해당 값을 가지고 오고
    // defaultValue가 있다면 이를 defaultValue로 덮어 씌어준다.
    // 만일 defaultValue도 없고 key도 정의되어 있지 않다면
    // value는 undefined이 될 것이다.
    const value = process.env[key] || defaultValue

    // value가 undefined이라면 key가 정의되어 있지 않다고 error를 던져줌
    if (value == null) { 
        throw new Error(`Key ${key} is undefined`);
    }

    return value;
}

export const config = {
    // jwt: {
    //     secretKey: required('JWT_SECRET'),
    //     expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800)),
    // },
    // bcrypt: {
    //     saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    // },
    host: {
        port: parseInt(required('PORT', 5000)),
    },
    db: {
        host: required('DB_HOST'),
    }
};