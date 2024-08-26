import mysql, { PoolConnection } from "mysql2/promise";

/**
 * @see https://sidorares.github.io/node-mysql2/docs#using-connection-pools
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

/**
 * 트랜잭션 내에서 데이터베이스 작업을 실행합니다
 *
 * @param callback - 트랜잭션 내에서 실행할 함수. 이 함수는 데이터베이스 연결을 매개변수로 받습니다
 * @returns 콜백 함수의 실행 결과
 *
 * @example
 * const result = await trx(async (connection) => {
 *   await connection.query('INSERT INTO users (name) VALUES (?)', ['John']);
 *   await connection.query('UPDATE accounts SET balance = balance - 100 WHERE user_id = ?', [1]);
 *   return { success: true };
 * });
 *
 * @throws 트랜잭션 실행 중 오류가 발생하면 롤백 후 예외를 던집니다.
 */
async function trx<T>(callback: (connection: PoolConnection) => Promise<T>) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    console.error(error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export { pool as db, trx };