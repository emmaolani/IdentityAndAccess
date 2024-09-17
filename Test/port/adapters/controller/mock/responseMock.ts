class ResponseMock {
  response: any;
  statusVal: any;

  send(aResponse: any) {
    this.response = aResponse;
  }
  status(aStatus: number) {
    this.statusVal = aStatus;
    return this;
  }

  getStatus() {
    return this.statusVal;
  }

  getResponse() {
    return this.response;
  }
}

export default ResponseMock;
