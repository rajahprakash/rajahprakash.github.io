//>>built
define(["require","exports"],function(e,f){return function(){function a(d,b){this._gl=d;this._vaoExt=b;this._initialized=!1;this._id=a._nextId++;this._glName=null;window.WebGL2RenderingContext&&this._gl instanceof window.WebGL2RenderingContext&&(this._vaoExt=d)}return Object.defineProperty(a.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0}),a.prototype.dispose=
function(){this._vaoExt.bindVertexArrayOES?this._vaoExt.bindVertexArrayOES(null):this._vaoExt.bindVertexArray(null);this._vaoExt&&this._glName&&(this._vaoExt.deleteVertexArrayOES?this._vaoExt.deleteVertexArrayOES(this._glName):this._vaoExt.deleteVertexArray(this._glName),this._glName=null)},a.prototype.initialize=function(a,b){if(!this._initialized){if(this._vaoExt){var c=this._vaoExt.createVertexArrayOES?this._vaoExt.createVertexArrayOES():this._vaoExt.createVertexArray();this._vaoExt.bindVertexArrayOES?
this._vaoExt.bindVertexArrayOES(c):this._vaoExt.bindVertexArray(c);a.apply(null,b);this._vaoExt.bindVertexArrayOES?this._vaoExt.bindVertexArrayOES(null):this._vaoExt.bindVertexArray(null);this._glName=c}this._initialized=!0}},a.prototype.bind=function(){this._vaoExt.bindVertexArrayOES?this._vaoExt.bindVertexArrayOES(this._glName):this._vaoExt.bindVertexArray(this._glName)},a.prototype.unbind=function(){this._vaoExt.bindVertexArrayOES?this._vaoExt.bindVertexArrayOES(null):this._vaoExt.bindVertexArray(null)},
a._nextId=0,a}()});