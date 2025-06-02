class AccountsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAccountHandler = this.postAccountHandler.bind(this);
    this.getAllAccountsHandler = this.getAllAccountsHandler.bind(this);
    this.getAccountHandler = this.getAccountHandler.bind(this);
    this.putAccountHandler = this.putAccountHandler.bind(this);
    this.deleteAccountHandler = this.deleteAccountHandler.bind(this);
    this.putPasswordHandler = this.putPasswordHandler.bind(this);
  }

  async postAccountHandler(request, h) {
    this._validator.validateAccountPayload(request.payload);

    const { email, password, username } = request.payload;

    const accountId = await this._service.addAccount({
      email,
      password,
      username,
      last_login: null,
      created_at: new Date().toISOString(),
    });

    const response = h.response({
      status: 'success',
      message: 'Akun berhasil ditambahkan',
      data: { accountId },
    });
    response.code(201);
    return response;
  }

  async getAllAccountsHandler(request, h) {
    const accounts = await this._service.getAllAccounts();

    return {
      status: 'success',
      data: { accounts },
    };
  }

  async getAccountHandler(request, h) {
    const { accountId } = request.params;
    const account = await this._service.getAccountById(accountId);

    if (!account) {
      const response = h.response({
        status: 'fail',
        message: 'Akun tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    return {
      status: 'success',
      data: { account },
    };
  }

  async putAccountHandler(request, h) {
    this._validator.validateAccountPayload(request.payload);
    const { accountId } = request.params;

    await this._service.updateAccount(accountId, request.payload);

    return {
      status: 'success',
      message: 'Akun berhasil diperbarui',
    };
  }

  async deleteAccountHandler(request, h) {
    const { accountId } = request.params;

    await this._service.deleteAccount(accountId);

    return {
      status: 'success',
      message: 'Akun berhasil dihapus',
    };
  }

  async putPasswordHandler(request, h) {
    const { accountId } = request.params;
    const { currentPassword, newPassword } = request.payload;

    this._validator.validatePasswordPayload(request.payload);

    try {
      await this._service.updatePassword(
        accountId,
        currentPassword,
        newPassword
      );

      return {
        status: 'success',
        message: 'Password berhasil diubah',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }
}

module.exports = AccountsHandler;
