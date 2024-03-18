import AJVError from './AJVError';
import AuthenticationError from './AuthenticationError';
import BadRequestError from './BadRequestError';
import BaseError from './BaseError';
import InvalidError from './InvalidError';
import InvalidTokenError from './InvalidTokenError';
import RedisError from './RedisError';
import SequelizeError from './SequelizeError';
import SyntaxError from './SyntaxError';
import TimeoutError from './TimeoutError';

/**
 * Error Name 
 * * BaseError
 * * BadRequestError
 * * InvalidError
 * * InvalidTokenError
 * * SyntaxError
 * * TimeoutError
 * * AJVError
 * * SequelizeError
 * * RedisError
 */
enum ErrorName {
    BaseError = "BaseError",
    BadRequestError = "BadReqBadRequestErroruest",
    AuthenticationError = "AuthenticationError",
    InvalidTokenError = "InvalidTokenError",    
    InvalidError = "InvalidError",    
    SyntaxError = "SyntaxError",
    TimeoutError = "TimeoutError",
    AJVError = "AJVError",
    SequelizeError = "SequelizeError",
    RedisError = "RedisError"
}

export {BaseError, BadRequestError, InvalidTokenError, InvalidError, SyntaxError, TimeoutError, AuthenticationError, AJVError, SequelizeError, ErrorName, RedisError};