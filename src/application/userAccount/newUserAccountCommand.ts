class NewUserAccountCommand {
  private id: string;
  private username: string;
  private password: string;
  private active: boolean;
  constructor(anId: string, aUsername: string, aPassword: string) {
    this.id = anId;
    this.username = aUsername;
    this.password = aPassword;
    this.active = true;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getActive() {
    return this.active;
  }
}

export default NewUserAccountCommand;
