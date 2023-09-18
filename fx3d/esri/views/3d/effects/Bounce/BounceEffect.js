//>>built
define("dojo/_base/lang dojo/_base/array esri/core/declare esri/core/lang esri/views/3d/webgl-engine/lib/Util esri/views/3d/webgl-engine/lib/gl-matrix ../../webgl-engine-extensions/VertexBufferLayout ../../webgl-engine-extensions/GLVertexArrayObject ../../webgl-engine-extensions/GLXBO ../../webgl-engine-extensions/GLVerTexture ../../support/fx3dUtils ../../support/fx3dUnits ../../support/interpolationUtils ../Effect ./BounceMaterial".split(" "),function(u,O,P,z,Q,D,R,E,A,S,h,w,F,T,U){var r,B,G,d=
D.vec3d,H=D.vec2,p=d.create(),q=d.create(),v=d.create(),n=d.create(),I=d.create(),J=d.create(),K=d.create(),L=d.create(),M=d.create(),V=d.createFrom(0,0,1),m=0,C=-1,x=0,N=Q.VertexAttrConstants;return P([T],{declaredClass:"esri.views.3d.effects.Bounce.BounceEffect",effectName:"Bounce",constructor:function(b){u.hitch(this,b);this.orderId=2;this._pointsNum=15;this._cachedFlyPaths={};this._cachedPulses={};this._timeAwareFids=[];this._needsAllLoaded=!0;this._layer.timeInfo instanceof Object?(this._hasTimeInfo=
!0,this._needsRenderPath=!1):this._hasTimeInfo=!1;this._hasTimeInfo=!1},_initRenderingInfo:function(){this.renderingInfo.radius=30;this.renderingInfo.dashHeight=1E5;this.renderingInfo.haloColors=[h.rgbNames.cadetblue,h.rgbNames.yellowgreen,h.rgbNames.lightpink,h.rgbNames.orangered,h.rgbNames.green,h.rgbNames.indianred];this._shapeDirty=this._vacDirty=this._renderingInfoDirty=this._colorBarDirty=!0;this.inherited(arguments)},_doRenderingInfoChange:function(b){this.inherited(arguments);for(var a in b)b.hasOwnProperty(a)&&
this.renderingInfo.hasOwnProperty(a)&&(z.endsWith(a.toLowerCase(),"info")?h.isInforAttrChanged(this.renderingInfo[a],b[a])&&(this._renderingInfoDirty=!0):z.endsWith(a.toLowerCase(),"color")?b[a]instanceof Array&&3==b[a].length&&(this.renderingInfo[a]=[b[a][0]/255,b[a][1]/255,b[a][2]/255]):z.endsWith(a.toLowerCase(),"colors")?b[a]instanceof Array&&(this.renderingInfo[a]=b[a],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"radius"===a.toLowerCase()||"dashHeight"===a.toLowerCase()||"transparency"===
a.toLowerCase()?(this._clampScope(b,a),"radius"==a&&this._radiusUnit?this.renderingInfo[a]=w.toMeters(this._radiusUnit,b[a],this._view.viewingMode):"dashHeight"==a&&this._dashHeightUnit?(this.renderingInfo[a]=w.toMeters(this._dashHeightUnit,b[a],this._view.viewingMode),this._updateDefaultLabelHeight()):this.renderingInfo[a]=b[a]):typeof b[a]==typeof this.renderingInfo[a]&&(this.renderingInfo[a]=b[a]))},_updateDefaultLabelHeight:function(){var b=this._pointsNum*this.renderingInfo.dashHeight;this._layer._labelDefaultHeight=
{flag:0,min:b,max:b}},setContext:function(b){this.inherited(arguments);this._effectConfig&&u.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._dashHeightUnit=null,O.forEach(this._effectConfig.renderingInfo,function(a){"radius"===a.name.toLowerCase()?(this._radiusUnit=a.unit,this.renderingInfo.radius=w.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"dashHeight"===a.name.toLowerCase()&&(this._dashHeightUnit=a.unit,this.renderingInfo.dashHeight=w.toMeters(this._dashHeightUnit,
this.renderingInfo.dashHeight,this._view.viewingMode),this._updateDefaultLabelHeight())}.bind(this)),this._aroundVerticesTexture=new S(this._gl),this._aroundVerticesTextureSize=H.create())},destroy:function(){this._resetXBOs();this._dispose("_aroundVerticesTexture");this._dispose("_vao");this._dispose("_pulseVAO")},_resetXBOs:function(){this._dispose("_vbo");this._dispose("_ibo");this._dispose("_pulseVBO");m=0;C=-1;x=r=0;this._needsRenderPath=!1},_initVertexLayout:function(){this._vertexAttrConstants=
[N.POSITION,N.AUXPOS1];this._vertexBufferLayout=new R(this._vertexAttrConstants,[3,2],[5126,5126])},_initRenderContext:function(){return this.inherited(arguments),this._vacDirty&&(this._initVertexLayout(),this._resetXBOs(),this._vacDirty=!1,this._vao&&(this._vao.unbind(),this._vao._initialized=!1),this._pulseVAO&&(this._pulseVAO.unbind(),this._pulseVAO._initialized=!1)),this._pulseVBO||(this._pulseVBO=new A(this._gl,!0,this._vertexBufferLayout)),this._hasTimeInfo?(this._vbo||(this._vbo=new A(this._gl,
!0,this._vertexBufferLayout)),this._ibo||(this._ibo=new A(this._gl,!1)),this._vaoExt&&(this._vao=new E(this._gl,this._vaoExt)),this._buildTimeAwareAroundPathGeometries()):(this._vaoExt&&(this._pulseVAO=new E(this._gl,this._vaoExt)),this._buildVerticalGeometries())},_buildTimeAwareAroundPathGeometries:function(){var b,a,f=this._allGraphics();if(f.sort(function(c,f){return b=c.attributes[this._layer.timeInfo.startTimeField],a=f.attributes[this._layer.timeInfo.startTimeField],b===a?0:b<a?1:b>a?-1:0}.bind(this)),
this._cachedFlyPaths={},this._timeAwareFids=[],1<f.length){for(var c,e,y,g,k,m,r,t=[],l=0,u=f.length-1;l<u;l++)if(null!=f[l].geometry){c=f[l].geometry;c.altitude||(c.altitude=40.11);e=f[l+1].geometry;e.altitude||(e.altitude=40.11);d.set3(c.longitude,c.latitude,c.altitude,p);"global"===this._view.viewingMode?h.wgs84ToSphericalEngineCoords(p,0,p,0):"local"===this._view.viewingMode&&h.wgs84ToWebMerc(p,0,p,0);d.set3(e.longitude,e.latitude,e.altitude,q);"global"===this._view.viewingMode?h.wgs84ToSphericalEngineCoords(q,
0,q,0):"local"===this._view.viewingMode&&h.wgs84ToWebMerc(q,0,q,0);0==l&&this._initPulseGeometries(l,f[l]);d.subtract(p,q,v);c=d.length(v);"global"===this._view.viewingMode?y=5E5>=c?18:1E6>=c?40:Math.floor(1E-5*c):"local"===this._view.viewingMode&&(y=1E6>=c?10:2E6>=c?18:Math.floor(6E-6*c));c*=.6;d.lerp(p,q,.5,n);"global"===this._view.viewingMode?(r=d.length(n),d.normalize(n,n),d.scale(n,r+c,n)):"local"===this._view.viewingMode&&(d.scale(V,c,M),d.add(n,M,n));d.normalize(v,v);d.scale(v,c,I);d.add(n,
I,J);d.scale(v,-c,K);d.add(n,K,L);this._cachedFlyPaths[f[l].attributes.FID]={vertices:null,indices:null};t=F.getPoints(y,p,p,J,n);t.pop();t=t.concat(F.getPoints(y,n,L,q,q));c=t.length;e=[];g=[];k=0;for(m=c;k<m;k++)e.push(t[k][0],t[k][1],t[k][2],k,c),k<m-1&&0===(1&k)&&(g.push(k,k+1),k+1===c-2&&g.push(k+1,k+2));this._cachedFlyPaths[f[l].attributes.FID].vertices=new Float32Array(e);this._cachedFlyPaths[f[l].attributes.FID].indices=new Uint32Array(g);this._timeAwareFids.push(f[l].attributes.FID);this._initPulseGeometries(l+
1,f[l+1])}return this._resetAddGeometries(),!0}return 1==f.length&&(this._initPulseGeometries(0,f[0]),this._resetAddGeometries(),!0)},_initPulseGeometries:function(b,a){if(a.geometry){var f,c,e=a.geometry,d=this._vertexBufferLayout.getStride(),g=new Float32Array(this._pointsNum*d);for(f=0;f<this._pointsNum;f++)c=d*f,g[c+0]=e.longitude,g[c+1]=e.latitude,g[c+2]=null==e.altitude?40.11:40.11+e.altitude,g[c+3]=f==this._pointsNum-1?-this._pointsNum-1:f+1,g[c+4]=b;this._cachedPulses[a.attributes.FID]={vertices:g}}},
_buildVerticalGeometries:function(){var b=this._allGraphics();if(0<b.length){for(var a,f=this._vertexBufferLayout.getStride(),c=new Float32Array(b.length*f*this._pointsNum),e=0,d=0,g=0,d=0;d<b.length;d++)if(a=b[d].geometry)for(g=0;g<this._pointsNum;g++)e=(d*this._pointsNum+g)*f,c[e+0]=a.longitude,c[e+1]=a.latitude,c[e+2]=null==a.altitude?40.11:40.11+a.altitude,c[e+3]=g==this._pointsNum-1?-this._pointsNum-1:g+1,c[e+4]=d;return this._pulseVBO.addData(!1,c),this._pulseVAO&&(this._pulseVAO._initialized=
!1),this._resetAddGeometries(),!0}return!1},_initAroundVerticesTexture:function(){if(2*this._pathIdNum!==this._tmpPoints.length)return!1;var b=this._gl.getParameter(3379),a=2*this._pathIdNum,d=h.nextHighestPowerOfTwo(a);d>b&&(d=b,console.warn("Too many graphics, and some data will be discarded."));a=Math.ceil(a/d);a=h.nextHighestPowerOfTwo(a);a>b&&(a=b,console.warn("Too many graphics, and some data will be discarded."));for(var c=new Float32Array(d*a*4),e=0;e<this._pathIdNum;e++)b=8*e,c[0+b]=e,c[1+
b]=this._tmpPoints[2*e][0],c[2+b]=this._tmpPoints[2*e][1],c[3+b]=this._tmpPoints[2*e][2],c[4+b]=e,c[5+b]=this._tmpPoints[2*e+1][0],c[6+b]=this._tmpPoints[2*e+1][1],c[7+b]=this._tmpPoints[2*e+1][2];return this._aroundVerticesTexture.setData(d,a,c),H.set2(d,a,this._aroundVerticesTextureSize),!0},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new U({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,
shaderSnippets:this._shaderSnippets})),this._material.loadShaders(this._hasTimeInfo)},_initColourMap:function(){this._colourMapTexture||(this._colourMapTexture=this._gl.createTexture());var b=new Image;b.src=h.spriteImg;var a=this;return b.onload=function(){var d=a._gl.getParameter(a._gl.TEXTURE_BINDING_2D);a._gl.bindTexture(3553,a._colourMapTexture);a._gl.pixelStorei(37440,!0);a._gl.texParameteri(3553,10240,9728);a._gl.texParameteri(3553,10241,9728);a._gl.texParameteri(3553,10242,33071);a._gl.texParameteri(3553,
10243,33071);a._gl.texImage2D(3553,0,6408,6408,5121,b);a._gl.generateMipmap(3553);a._gl.bindTexture(3553,d)},0===this._gl.getError()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var b=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture);this._gl.pixelStorei(37440,!0);this._gl.texParameteri(3553,10240,9728);this._gl.texParameteri(3553,10241,9728);this._gl.texParameteri(3553,10242,33071);this._gl.texParameteri(3553,
10243,33071);var a=h.createColorBarTexture(32,1,this.renderingInfo.haloColors);return this._gl.texImage2D(3553,0,6408,6408,5121,a),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,b),0===this._gl.getError()},render:function(b,a){this.inherited(arguments);this._layer.visible&&this.ready&&this._bindPramsReady()&&(this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._hasTimeInfo?this._renderWithTimeInfo(b,a):this._renderWithoutTimeInfo(b,a))},_renderWithTimeInfo:function(b,
a){this._material.bind(u.mixin({},{ms:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],pi:this._vizFieldVerTextureSize,om:this._colourMapTexture,lm:this.renderingInfo.animationInterval,os:this.renderingInfo.transparency,ll:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,si:this._vizFieldMinMaxs[this._vizFieldDefault].max>
this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,is:this._colorBarTexture,ss:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},b));m=Math.floor(this.time/this.renderingInfo.animationInterval);this._repeatCount=Math.floor(m/this._timeAwareFids.length);m%=this._timeAwareFids.length;this._repeatCount>this.renderingInfo.repeat&&(m=this._timeAwareFids.length-
1);m!=C&&(0==(1&m)?(G=this._cachedPulses[this._timeAwareFids[r++]],this._pulseVBO.addData(!0,G.vertices),x=r-1):0<r&&(B=this._cachedFlyPaths[this._timeAwareFids[r-1]],this._vbo.addData(!1,B.vertices),this._ibo.addData(!1,B.indices),x=-1),C=m);this._material.bindBoolean("drawFlyPath",!1);this._material.bindFloat("currentIndex",x);this._material.blend(!0,a);this._pulseVBO.bind(this._material.getProgram());this._gl.drawArrays(0,0,this._pulseVBO.getNum());this._pulseVBO.unbind();1==(1&m)&&(this._material.bindBoolean("drawFlyPath",
!0),this._material.blend(!1,a),this._vbo.bind(this._material.getProgram()),this._ibo.bind(),this._gl.drawElements(1,this._ibo.getNum(),5125,0),this._ibo.unbind(),this._vbo.unbind());this._material.release()},_localPulseBinds:function(){this._pulseVBO.bind(this._material._program);this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program)},_bindPulseBuffer:function(){this._pulseVAO?(this._pulseVAO._initialized||this._pulseVAO.initialize(this._localPulseBinds.bind(this)),this._pulseVAO.bind()):
this._localPulseBinds()},_unBindPulseBuffer:function(){this._pulseVAO?this._pulseVAO.unbind():(this._pulseVBO.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program))},_renderWithoutTimeInfo:function(b,a){this._material.bind(u.mixin({},{ms:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],pi:this._vizFieldVerTextureSize,om:this._colourMapTexture,lm:this.renderingInfo.animationInterval,os:this.renderingInfo.transparency,ll:this._vizFieldMinMaxs[this._vizFieldDefault].min>
this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,si:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,is:this._colorBarTexture,ss:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},
b),a);this._material.blend(!0,a);this._bindPulseBuffer();this._gl.drawArrays(0,0,this._pulseVBO.getNum());this._material.release(a);this._unBindPulseBuffer()}})});