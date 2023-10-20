window.onload = function() {
  var viewport = document.querySelector('meta[name="viewport"]');
  viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
    var messageContainer = document.getElementById("messageContainer");
    var messageInput = document.getElementById("messageInput");

    var isFocused = false;

    messageInput.addEventListener("focus", function() {
      isFocused = true;
    });

    messageInput.addEventListener("blur", function() {
      isFocused = false;
    });
};

    let goEasy = GoEasy.getInstance({
      host: 'hangzhou.goeasy.io',
      appkey: "***************",//你的appkey
      modules: ['pubsub']
    });
 
    goEasy.connect({
      onSuccess: function () {
        console.log("GoEasy connect successfully.");
      },
      onFailed: function (error) {
        console.log("Failed to connect GoEasy, code:" + error.code + ", error:" + error.content);
      }
    });
    goEasy.pubsub.subscribe({
      channel: "channel",//
      onMessage: function (message) {
        console.log("接收到消息：" + message.content);
        displayMessage("received", "发送者：" + message.content);
      },
      onSuccess: function () {
        console.log("频道订阅成功。");
      },
      onFailed: function (error) {
        console.log("频道订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
      }
    });
    $(document).ready(function() {
      // 初始检查输入框的值
      checkInput();
    
      // 监听输入框的输入事件
      $("#messageInput").on("input", function() {
        checkInput();
      });
    });
    
    function checkInput() {
      var content = $("#messageInput").val().trim();
      if (content === "") {
        $("#sendButton").prop("disabled", true);
      } else {
        $("#sendButton").prop("disabled", false);
      }
    }
    //发送消息
    function sendMessage() {
      let message = $('#messageInput').val();
      displayMessage("sent", "我：" + message);
      $('#messageInput').val('');

      $.ajax({
        url: '***************',//你的php接口地址
        type: 'post',
        data: {
          content: message,
          channel: 'shared_channel'//
        },
        success: function (res) {
          console.log("消息发送成功");
        },
        error: function (error) {
          console.log("消息发送失败");
        }
      });
      $("#sendButton").prop("disabled", true);
    }

    function displayMessage(type, message) {
      let messageContainer = document.getElementById("messageContainer");
      let messageDiv = document.createElement("div");
      messageDiv.className = "message " + type;
      messageDiv.textContent = message;
      messageContainer.appendChild(messageDiv);
      messageContainer.scrollTop = messageContainer.scrollHeight; // 滚动到底部
    }