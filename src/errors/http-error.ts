/**
 * Valid informational responses:
 *  - 100 Continue
 *  - 101 Switching Protocol
 *  - 102 Processing (WebDAV)
 *  - 103 Early Hints
 */
export type HttpInformationalStatusCode = 100 | 101 | 102 | 103;

/**
 * Valid successful responses:
 *  - 200 OK
 *  - 201 Created
 *  - 202 Accepted
 *  - 203 Non-Authoritative Information
 *  - 204 No Content
 *  - 205 Reset Content
 *  - 206 Partial Content
 *  - 207 Multi-Status (WebDAV)
 *  - 208 Already Reported (WebDAV)
 *  - 226 IM Used
 */
export type HttpSuccessStatusCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

/**
 * Valid redirection status codes:
 *  - 300 Multiple Choice
 *  - 301 Moved Permanently
 *  - 302 Found
 *  - 303 See Other
 *  - 304 Not Modified
 *  - 307 Temporary Redirect
 *  - 308 Permanent Redirect
 */
export type HttpRedirectionStatusCode = 300 | 301 | 302 | 303 | 304 | 307 | 308;

/**
 * Valid client error status codes:
 *  - 400 Bad Request
 *  - 401 Unauthorized
 *  - 402 Payment Required (_Reserved for future use_)
 *  - 403 Forbidden
 *  - 404 Not Found
 *  - 405 Method Not Allowed
 *  - 406 Not Accpetable
 *  - 407 Proxy Authentication Required
 *  - 408 Request Timed Out
 *  - 409 Conflict
 *  - 410 Gone
 *  - 411 Length Required
 *  - 412 Precondition Failed
 *  - 413 Payload too large
 *  - 414 URI too long
 *  - 415 Unsupported Media Type
 *  - 416 Range Not Satisfiable
 *  - 417 Expectation Failed
 *  - 418 I'm a teapot: The server refuses to brew coffee with a teapot (The server is not designed for the requested task)
 *  - 421 Misdirected Request
 *  - 422 Unprocessable Entity
 *  - 423 Locked
 *  - 424 Failed Dependency
 *  - 425 Too Early (_Reserved for future use_)
 *  - 426 Upgrade Required
 *  - 428 Precondition Required
 *  - 429 Too Many Requests
 *  - 431 Request Header Fields Too Large
 *  - 432 Unavailable For Legal Reasons
 */
export type HttpClientErrorStatusCode = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409| 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451;

/**
 * Valid server error status codes:
 *  - 500 Internal Server Error
 *  - 501 Not Implemented
 *  - 502 Bad Gateway
 *  - 503 Service Unavailable
 *  - 504 Gateway Timeout
 *  - 505 HTTP Version Not Supported
 *  - 506 Variant Also Negotiates
 *  - 507 Insufficient Storage
 *  - 508 Loop Detected
 *  - 510 Not Extended
 *  - 511 Network Authentication Required
 */
export type HttpServerErrorStatusCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

export type HttpStatusCode = HttpInformationalStatusCode | HttpSuccessStatusCode | HttpRedirectionStatusCode | HttpClientErrorStatusCode | HttpServerErrorStatusCode;

export default class HttpError extends Error {
  status: HttpStatusCode = 200;

  constructor(status: HttpStatusCode, message?: string) {
    super(message);
    this.status = status;
  }
}
