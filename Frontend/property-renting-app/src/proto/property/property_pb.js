// source: property.proto
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

goog.exportSymbol('proto.PropertyImageMessage', null, global);
goog.exportSymbol('proto.PropertyMessage', null, global);
goog.exportSymbol('proto.RegisterPropertyResponse', null, global);
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
proto.PropertyMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.PropertyMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PropertyMessage.displayName = 'proto.PropertyMessage';
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
proto.PropertyImageMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.PropertyImageMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PropertyImageMessage.displayName = 'proto.PropertyImageMessage';
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
proto.RegisterPropertyResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.RegisterPropertyResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RegisterPropertyResponse.displayName = 'proto.RegisterPropertyResponse';
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
proto.PropertyMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.PropertyMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PropertyMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PropertyMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    typeId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    country: jspb.Message.getFieldWithDefault(msg, 3, ""),
    city: jspb.Message.getFieldWithDefault(msg, 4, ""),
    address: jspb.Message.getFieldWithDefault(msg, 5, ""),
    size: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    furnished: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    numberOfRooms: jspb.Message.getFieldWithDefault(msg, 8, 0),
    distanceFromCenter: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
    internetIncluded: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    airConditionIncluded: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
    averageRating: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    image: (f = msg.getImage()) && proto.PropertyImageMessage.toObject(includeInstance, f)
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
 * @return {!proto.PropertyMessage}
 */
proto.PropertyMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PropertyMessage;
  return proto.PropertyMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PropertyMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PropertyMessage}
 */
proto.PropertyMessage.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTypeId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCountry(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCity(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSize(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFurnished(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumberOfRooms(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDistanceFromCenter(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setInternetIncluded(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAirConditionIncluded(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageRating(value);
      break;
    case 13:
      var value = new proto.PropertyImageMessage;
      reader.readMessage(value,proto.PropertyImageMessage.deserializeBinaryFromReader);
      msg.setImage(value);
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
proto.PropertyMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PropertyMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PropertyMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PropertyMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTypeId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getCountry();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCity();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getSize();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getFurnished();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getNumberOfRooms();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getDistanceFromCenter();
  if (f !== 0.0) {
    writer.writeDouble(
      9,
      f
    );
  }
  f = message.getInternetIncluded();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getAirConditionIncluded();
  if (f) {
    writer.writeBool(
      11,
      f
    );
  }
  f = message.getAverageRating();
  if (f !== 0.0) {
    writer.writeDouble(
      12,
      f
    );
  }
  f = message.getImage();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.PropertyImageMessage.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.PropertyMessage.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 type_id = 2;
 * @return {number}
 */
proto.PropertyMessage.prototype.getTypeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setTypeId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string country = 3;
 * @return {string}
 */
proto.PropertyMessage.prototype.getCountry = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setCountry = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string city = 4;
 * @return {string}
 */
proto.PropertyMessage.prototype.getCity = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setCity = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string address = 5;
 * @return {string}
 */
proto.PropertyMessage.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional double size = 6;
 * @return {number}
 */
proto.PropertyMessage.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setSize = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional bool furnished = 7;
 * @return {boolean}
 */
proto.PropertyMessage.prototype.getFurnished = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setFurnished = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional int32 number_of_rooms = 8;
 * @return {number}
 */
proto.PropertyMessage.prototype.getNumberOfRooms = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setNumberOfRooms = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional double distance_from_center = 9;
 * @return {number}
 */
proto.PropertyMessage.prototype.getDistanceFromCenter = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setDistanceFromCenter = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};


/**
 * optional bool internet_included = 10;
 * @return {boolean}
 */
proto.PropertyMessage.prototype.getInternetIncluded = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setInternetIncluded = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional bool air_condition_included = 11;
 * @return {boolean}
 */
proto.PropertyMessage.prototype.getAirConditionIncluded = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 11, false));
};


/**
 * @param {boolean} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setAirConditionIncluded = function(value) {
  return jspb.Message.setProto3BooleanField(this, 11, value);
};


/**
 * optional double average_rating = 12;
 * @return {number}
 */
proto.PropertyMessage.prototype.getAverageRating = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.setAverageRating = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional PropertyImageMessage image = 13;
 * @return {?proto.PropertyImageMessage}
 */
proto.PropertyMessage.prototype.getImage = function() {
  return /** @type{?proto.PropertyImageMessage} */ (
    jspb.Message.getWrapperField(this, proto.PropertyImageMessage, 13));
};


/**
 * @param {?proto.PropertyImageMessage|undefined} value
 * @return {!proto.PropertyMessage} returns this
*/
proto.PropertyMessage.prototype.setImage = function(value) {
  return jspb.Message.setWrapperField(this, 13, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.PropertyMessage} returns this
 */
proto.PropertyMessage.prototype.clearImage = function() {
  return this.setImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.PropertyMessage.prototype.hasImage = function() {
  return jspb.Message.getField(this, 13) != null;
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
proto.PropertyImageMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.PropertyImageMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PropertyImageMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PropertyImageMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 2, ""),
    picByte: msg.getPicByte_asB64()
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
 * @return {!proto.PropertyImageMessage}
 */
proto.PropertyImageMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PropertyImageMessage;
  return proto.PropertyImageMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PropertyImageMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PropertyImageMessage}
 */
proto.PropertyImageMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPicByte(value);
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
proto.PropertyImageMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PropertyImageMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PropertyImageMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PropertyImageMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPicByte_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.PropertyImageMessage.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.PropertyImageMessage} returns this
 */
proto.PropertyImageMessage.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.PropertyImageMessage.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.PropertyImageMessage} returns this
 */
proto.PropertyImageMessage.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bytes pic_byte = 3;
 * @return {!(string|Uint8Array)}
 */
proto.PropertyImageMessage.prototype.getPicByte = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes pic_byte = 3;
 * This is a type-conversion wrapper around `getPicByte()`
 * @return {string}
 */
proto.PropertyImageMessage.prototype.getPicByte_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPicByte()));
};


/**
 * optional bytes pic_byte = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPicByte()`
 * @return {!Uint8Array}
 */
proto.PropertyImageMessage.prototype.getPicByte_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPicByte()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.PropertyImageMessage} returns this
 */
proto.PropertyImageMessage.prototype.setPicByte = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
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
proto.RegisterPropertyResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.RegisterPropertyResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RegisterPropertyResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RegisterPropertyResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    property: (f = msg.getProperty()) && proto.PropertyMessage.toObject(includeInstance, f),
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
 * @return {!proto.RegisterPropertyResponse}
 */
proto.RegisterPropertyResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RegisterPropertyResponse;
  return proto.RegisterPropertyResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RegisterPropertyResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RegisterPropertyResponse}
 */
proto.RegisterPropertyResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.PropertyMessage;
      reader.readMessage(value,proto.PropertyMessage.deserializeBinaryFromReader);
      msg.setProperty(value);
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
proto.RegisterPropertyResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RegisterPropertyResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RegisterPropertyResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RegisterPropertyResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProperty();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.PropertyMessage.serializeBinaryToWriter
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
 * optional PropertyMessage property = 1;
 * @return {?proto.PropertyMessage}
 */
proto.RegisterPropertyResponse.prototype.getProperty = function() {
  return /** @type{?proto.PropertyMessage} */ (
    jspb.Message.getWrapperField(this, proto.PropertyMessage, 1));
};


/**
 * @param {?proto.PropertyMessage|undefined} value
 * @return {!proto.RegisterPropertyResponse} returns this
*/
proto.RegisterPropertyResponse.prototype.setProperty = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RegisterPropertyResponse} returns this
 */
proto.RegisterPropertyResponse.prototype.clearProperty = function() {
  return this.setProperty(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RegisterPropertyResponse.prototype.hasProperty = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string return_message = 2;
 * @return {string}
 */
proto.RegisterPropertyResponse.prototype.getReturnMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.RegisterPropertyResponse} returns this
 */
proto.RegisterPropertyResponse.prototype.setReturnMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto);
