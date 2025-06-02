class AccountsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAccountHandler = this.postAccountHandler.bind(this);
    this.getAllAccountsHandler = this.getAllAccountsHandler.bind(this);
    this.getAccountHandler = this.getAccountHandler.bind(this);
    this.putAccountHandler = this.putAccountHandler.bind(this);
    this.deleteAccountHandler = this.deleteAccountHandler.bind(this);
  }

  // CREATE account
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

  // READ all accounts
  async getAllAccountsHandler(request, h) {
    const accounts = await this._service.getAllAccounts();

    return {
      status: 'success',
      data: { accounts },
    };
  }

  // READ account by accountId
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

  // UPDATE account by accountId
  async putAccountHandler(request, h) {
    this._validator.validateAccountPayload(request.payload);
    const { accountId } = request.params;

    await this._service.updateAccount(accountId, request.payload);

    return {
      status: 'success',
      message: 'Akun berhasil diperbarui',
    };
  }

  // DELETE account by accountId
  async deleteAccountHandler(request, h) {
    const { accountId } = request.params;

    await this._service.deleteAccount(accountId);

    return {
      status: 'success',
      message: 'Akun berhasil dihapus',
    };
  }
}

module.exports = AccountsHandler;
