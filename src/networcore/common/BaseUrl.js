export default class BaseUrl {
  constructor({ schema, host }) {
    this.schema = schema;
    this.host = host;
  }

  get url() {
    return `${this.schema}://${this.host}`;
  }
}