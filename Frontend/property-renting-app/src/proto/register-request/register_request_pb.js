// source: register_request.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.CreateRegisterRequestResponse', null, global);
goog.exportSymbol('proto.EmailVerificationMessage', null, global);
goog.exportSymbol('proto.EmailVerificationResponse', null, global);
goog.exportSymbol('proto.RegisterRequestMessage', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RegisterRequestMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RegisterRequestMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RegisterRequestMessage.displayName = 'proto.RegisterRequestMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CreateRegisterRequestResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CreateRegisterRequestResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CreateRegisterRequestResponse.displayName = 'proto.CreateRegisterRequestResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EmailVerificationMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EmailVerificationMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EmailVerificationMessage.displayName = 'proto.EmailVerificationMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EmailVerificationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EmailVerificationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.EmailVerificationResponse.displayName = 'proto.EmailVerificationResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RegisterRequestMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.RegisterRequestMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RegisterRequestMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RegisterRequestMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    firstName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    surname: jspb.Message.getFieldWithDefault(msg, 3, ""),
    email: jspb.Message.getFieldWithDefault(msg, 4, ""),
    phone: jspb.Message.getFieldWithDefault(msg, 5, ""),
    password: jspb.Message.getFieldWithDefault(msg, 6, ""),
    confirmPassword: jspb.Message.getFieldWithDefault(msg, 7, ""),
    country: jspb.Message.getFieldWithDefault(msg, 8, ""),
    city: jspb.Message.getFieldWithDefault(msg, 9, ""),
    address: jspb.Message.getFieldWithDefault(msg, 10, ""),
    postcode: jspb.Message.getFieldWithDefault(msg, 11, ""),
    isLandlord: jspb.Message.getBooleanFieldWithDefault(msg, 12, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RegisterRequestMessage}
 */
proto.RegisterRequestMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RegisterRequestMessage;
  return proto.RegisterRequestMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RegisterRequestMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RegisterRequestMessage}
 */
proto.RegisterRequestMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFirstName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSurname(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhone(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setConfirmPassword(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setCountry(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setCity(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setPostcode(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsLandlord(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RegisterRequestMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RegisterRequestMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RegisterRequestMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RegisterRequestMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getFirstName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSurname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPhone();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getConfirmPassword();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getCountry();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getCity();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getPostcode();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getIsLandlord();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.RegisterRequestMessage.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string first_name = 2;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getFirstName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setFirstName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string surname = 3;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getSurname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setSurname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string email = 4;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string phone = 5;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getPhone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setPhone = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string password = 6;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string confirm_password = 7;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getConfirmPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setConfirmPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string country = 8;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getCountry = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setCountry = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string city = 9;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getCity = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setCity = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string address = 10;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string postcode = 11;
 * @return {string}
 */
proto.RegisterRequestMessage.prototype.getPostcode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setPostcode = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional bool is_landlord = 12;
 * @return {boolean}
 */
proto.RegisterRequestMessage.prototype.getIsLandlord = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.RegisterRequestMessage} returns this
 */
proto.RegisterRequestMessage.prototype.setIsLandlord = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CreateRegisterRequestResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.CreateRegisterRequestResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CreateRegisterRequestResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CreateRegisterRequestResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    registerRequest: (f = msg.getRegisterRequest()) && proto.RegisterRequestMessage.toObject(includeInstance, f),
    returnMessage: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CreateRegisterRequestResponse}
 */
proto.CreateRegisterRequestResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CreateRegisterRequestResponse;
  return proto.CreateRegisterRequestResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CreateRegisterRequestResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CreateRegisterRequestResponse}
 */
proto.CreateRegisterRequestResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.RegisterRequestMessage;
      reader.readMessage(value,proto.RegisterRequestMessage.deserializeBinaryFromReader);
      msg.setRegisterRequest(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setReturnMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CreateRegisterRequestResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CreateRegisterRequestResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CreateRegisterRequestResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CreateRegisterRequestResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRegisterRequest();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.RegisterRequestMessage.serializeBinaryToWriter
    );
  }
  f = message.getReturnMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional RegisterRequestMessage register_request = 1;
 * @return {?proto.RegisterRequestMessage}
 */
proto.CreateRegisterRequestResponse.prototype.getRegisterRequest = function() {
  return /** @type{?proto.RegisterRequestMessage} */ (
    jspb.Message.getWrapperField(this, proto.RegisterRequestMessage, 1));
};


/**
 * @param {?proto.RegisterRequestMessage|undefined} value
 * @return {!proto.CreateRegisterRequestResponse} returns this
*/
proto.CreateRegisterRequestResponse.prototype.setRegisterRequest = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CreateRegisterRequestResponse} returns this
 */
proto.CreateRegisterRequestResponse.prototype.clearRegisterRequest = function() {
  return this.setRegisterRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CreateRegisterRequestResponse.prototype.hasRegisterRequest = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string return_message = 2;
 * @return {string}
 */
proto.CreateRegisterRequestResponse.prototype.getReturnMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.CreateRegisterRequestResponse} returns this
 */
proto.CreateRegisterRequestResponse.prototype.setReturnMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EmailVerificationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.EmailVerificationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EmailVerificationMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EmailVerificationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    email: jspb.Message.getFieldWithDefault(msg, 1, ""),
    token: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EmailVerificationMessage}
 */
proto.EmailVerificationMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EmailVerificationMessage;
  return proto.EmailVerificationMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EmailVerificationMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EmailVerificationMessage}
 */
proto.EmailVerificationMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EmailVerificationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EmailVerificationMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EmailVerificationMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EmailVerificationMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string email = 1;
 * @return {string}
 */
proto.EmailVerificationMessage.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.EmailVerificationMessage} returns this
 */
proto.EmailVerificationMessage.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string token = 2;
 * @return {string}
 */
proto.EmailVerificationMessage.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.EmailVerificationMessage} returns this
 */
proto.EmailVerificationMessage.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EmailVerificationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.EmailVerificationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EmailVerificationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EmailVerificationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    email: jspb.Message.getFieldWithDefault(msg, 1, ""),
    returnMessage: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EmailVerificationResponse}
 */
proto.EmailVerificationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EmailVerificationResponse;
  return proto.EmailVerificationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EmailVerificationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EmailVerificationResponse}
 */
proto.EmailVerificationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setReturnMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EmailVerificationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EmailVerificationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EmailVerificationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EmailVerificationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getReturnMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string email = 1;
 * @return {string}
 */
proto.EmailVerificationResponse.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.EmailVerificationResponse} returns this
 */
proto.EmailVerificationResponse.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string return_message = 2;
 * @return {string}
 */
proto.EmailVerificationResponse.prototype.getReturnMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.EmailVerificationResponse} returns this
 */
proto.EmailVerificationResponse.prototype.setReturnMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto);
