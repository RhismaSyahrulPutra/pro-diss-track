const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AccountsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAccount({ email, password, username, last_login, created_at }) {
    await this.verifyNewEmail(email);
    await this.verifyNewUsername(username);

    const accountId = `account-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `INSERT INTO accounts (account_id, email, password, username, last_login, created_at)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING account_id`,
      values: [
        accountId,
        email,
        hashedPassword,
        username,
        last_login,
        created_at,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Akun gagal ditambahkan');
    }
    return result.rows[0].account_id;
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM accounts WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError('Email sudah digunakan');
    }
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM accounts WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError('Username sudah digunakan');
    }
  }

  async getAccountById(accountId) {
    const query = {
      text: 'SELECT account_id, email, username, last_login, created_at FROM accounts WHERE account_id = $1',
      values: [accountId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return null;
    }
    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT account_id, password FROM accounts WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Kredensial yang Anda berikan salah');
    }

    const { account_id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new InvariantError('Kredensial yang Anda berikan salah');
    }

    return account_id;
  }

  async getAllAccounts() {
    const query = {
      text: 'SELECT account_id, email, username, last_login, created_at FROM accounts',
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async updateAccount(accountId, { email, password, username, last_login }) {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const currentAccount = await this.getAccountById(accountId);
    if (!currentAccount) {
      throw new NotFoundError('Akun tidak ditemukan');
    }

    if (email && email !== currentAccount.email) {
      await this.verifyNewEmail(email);
    }
    if (username && username !== currentAccount.username) {
      await this.verifyNewUsername(username);
    }

    const query = {
      text: `UPDATE accounts
             SET email = COALESCE($2, email),
                 password = COALESCE($3, password),
                 username = COALESCE($4, username),
                 last_login = COALESCE($5, last_login)
             WHERE account_id = $1`,
      values: [accountId, email, hashedPassword, username, last_login],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Gagal memperbarui akun. Id tidak ditemukan');
    }
  }

  async deleteAccount(accountId) {
    const query = {
      text: 'DELETE FROM accounts WHERE account_id = $1 RETURNING account_id',
      values: [accountId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Akun tidak ditemukan');
    }
  }

  async updatePassword(accountId, currentPassword, newPassword) {
    const query = {
      text: 'SELECT password FROM accounts WHERE account_id = $1',
      values: [accountId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Akun tidak ditemukan');
    }

    const { password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(currentPassword, hashedPassword);

    if (!match) {
      throw new InvariantError('Password lama salah');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = {
      text: 'UPDATE accounts SET password = $1 WHERE account_id = $2',
      values: [newHashedPassword, accountId],
    };

    const updateResult = await this._pool.query(updateQuery);

    if (updateResult.rowCount === 0) {
      throw new NotFoundError('Gagal mengubah password. Akun tidak ditemukan');
    }
  }
  async updateUsername(accountId, username) {
    const currentAccount = await this.getAccountById(accountId);
    if (!currentAccount) {
      throw new NotFoundError('Akun tidak ditemukan');
    }

    if (username === currentAccount.username) {
      return; // Tidak perlu update jika tidak berubah
    }

    await this.verifyNewUsername(username);

    const query = {
      text: 'UPDATE accounts SET username = $1 WHERE account_id = $2',
      values: [username, accountId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError(
        'Gagal memperbarui username. Akun tidak ditemukan'
      );
    }
  }
}

module.exports = AccountsService;
