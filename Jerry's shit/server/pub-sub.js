var PubSub = (function() {
  function PubSub() {}
  PubSub.subscribe = function(eventName, func) {
    this.initDic(eventName);
    this.dic[eventName].push(func);
  };
  PubSub.unsubscribe = function(eventName, func) {
    this.initDic(eventName);
    this.dic[eventName] = this.dic[eventName].filter(function(x) {
      return x != func;
    });
    if (!this.dic[eventName].length) {
      delete this.dic[eventName];
    }
  };
  PubSub.publish = function(eventName, data) {
    this.initDic();
    /* Iterate through all the subscribes and notify them */
    if (this.dic[eventName])
      for (var _i = 0, _a = this.dic[eventName]; _i < _a.length; _i++) {
        var func = _a[_i];
        func(data);
      }
  };
  PubSub.initDic = function(eventName) {
    if (!this.dic) {
      this.dic = {};
    }
    if (eventName && !this.dic[eventName]) {
      this.dic[eventName] = [];
    }
  };
  PubSub.dic = null;
  return PubSub;
})();

// class PubSub {
//   constructor() {}

//   subscribe(eventName, func) {
//     this.initDic(eventName);
//     this.dic[eventName].push(func);
//   }

//   unsubscribe(eventName, func) {
//     this.initDic(eventName);
//     this.dic[eventName] = this.dic[eventName].filter(function(x) {
//       return x != func;
//     });
//     if (!this.dic[eventName].length) {
//       delete this.dic[eventName];
//     }
//   }
//   publish(eventName, data) {
//     this.initDic();
//     if (this.dic[eventName])
//       for (var _i = 0, _a = this.dic[eventName]; _i < _a.length; _i++) {
//         var func = _a[_i];
//         func(data);
//       }
//   }
//   initDic(eventName) {
//     if (!this.dic) {
//       this.dic = {};
//     }
//     if (eventName && !this.dic[eventName]) {
//       this.dic[eventName] = [];
//     }
//   }
//   // dic = null;
// }

const customer = function(name) {
  this.name = name;

  function emailReceiver(data) {
    console.log(
      `${this.name} -- I received an email from ${data.sender}, content: ${data.content}`
    );
  }
  PubSub.subscribe(`receiveEmail${this.name}`, emailReceiver.bind(this));
};

const manager = function(name) {
  this.name = name;

  this.sendMessage = (customerName, content) => {
    PubSub.publish(`receiveEmail${customerName}`, {
      sender: this.name,
      content: content
    });
  };
};

let jack = new customer("Jack");
let eli = new customer("Eli");

let manager1 = new manager("Boss");
manager1.sendMessage("Jack", "you should prepare a report until tomorrow!");
manager1.sendMessage("Eli", "call me!");
