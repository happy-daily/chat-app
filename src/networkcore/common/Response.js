export default class Response {
  constructor({ data, status, statusText, headers }) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
    this.headers = headers.map;
  }

  static async parse(response) {
    const { headers } = response;
    const contentType = headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return new Response({
      data: data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  static async parseError(request, response, message) {
    const error = {
      request,
      message,
    };
    if (response === null) {
      return error;
    }

    error.response = await Response.parse(response);
    if (typeof error.response.data === 'object') {
      error.message = error.response.data.message;
    } else {
      const {
        status,
        statusText,
      } = error.response;
      error.message = `${status} ${statusText}`;
    }
    return error;
  }
}