var io = require('socket.io')();
var logger = require('./util/logutil');
var timmer = require('./timer');

var dbutil = require('./util/dbutil.js');

// 代理
var userProxy = require('./proxy/userProxy.js'); 
var teamProxy = require('./proxy/teamProxy.js');
var socketProxy = require('./proxy/socketProxy.js');
var battleProxy = require('./proxy/battleProxy.js');
var paymentProxy = require('./proxy/paymentProxy.js');
var chatProxy = require('./proxy/chatProxy.js');
var adminProxy = require('./proxy/adminProxy.js');
var stripeProxy = require('./proxy/stripeProxy.js');
var lolKeyProxy = require('./proxy/lolKeyProxy.js');


// 初始化Proxy, 所有需要保存数据结构的对象都需要初始化, 只能初始化一次
userProxy.init();
teamProxy.init();
socketProxy.init();
battleProxy.init();
paymentProxy.init();
chatProxy.init();
adminProxy.init();
lolKeyProxy.init();

io.on('connection', function(socket) {
    logger.levelMsgLog(0, 'User ' + socket.id + ' connected!');
    userProxy.handleLogin(socket);

    userProxy.handleRegister(socket);

    userProxy.handleInviteFriend(socket);

    userProxy.handleRankRequest(socket);

    userProxy.handleUserInviteResult(io, socket);
   
    userProxy.insertFeedbackMessage(socket);

    userProxy.handleLOLBind(socket); 
    userProxy.handleIconIdUpdate(socket);
    userProxy.handleAddFriendRequest(socket);
    userProxy.handleAddFriendResult(socket);

    //余额
    userProxy.handleGetBalance(socket);
    //
    
    userProxy.handlePersonalCenterRequest(socket);
  
    teamProxy.handleRoomEstablish(socket);

    teamProxy.handleTeamEstablish(io, socket);

    teamProxy.handleVersusLobbyRefresh(socket);

    teamProxy.handleTeamDetails(socket);

    teamProxy.handleRefreshFormedBattleRoom(socket);

    battleProxy.handleBattleInvite(socket);

    battleProxy.handleBattleInviteResult(io, socket);

    battleProxy.handleLOLRoomEstablished(io, socket);

    battleProxy.handleBattleResult(io, socket);

    battleProxy.handleMatch(io);

    paymentProxy.handlePayment(socket);
    paymentProxy.handleBankInfo(socket);
    //资金流动
    paymentProxy.handleSearchCashFlow(socket);

    //提现管理
    adminProxy.handleWithdraw(socket);
    adminProxy.handleWithdrawAgree(socket);
    adminProxy.handleWithdrawDisagree(socket);

    socketProxy.handleReceivedTokenData(socket);
    socketProxy.handleReconnect(io, socket);

    //约战管理
    adminProxy.handleSearchBattleRecord(socket);
    adminProxy.handleChangeBattleResult(socket) ;

    //账户管理
    adminProxy.handleAllAccount(socket);
    adminProxy.handleSuspendAccount(socket);
    adminProxy.handleUnblockAccount(socket);

    //申诉反馈管理
    adminProxy.handleSearchFeedback(socket);
    adminProxy.handleFeedback(socket);

    //充值管理
    adminProxy.searchAllRechargeInfo(socket);

    //简单统计
    adminProxy.handleAnalysis(socket);

    chatProxy.handleChat(io,socket);

    //LOLkey
    lolKeyProxy.handleLOLKeyUpdate(socket);
    lolKeyProxy.handleLOLKeyRequest(socket);

});

io.on('disconnect', function (socket) {
    logger.levelMsgLog(0, 'User ' + socket.id + ' disconnected!');
    socketProxy.remove(socket);
});


//开启消息推送器
socketProxy.startstableEmiter();

//开启匹配器
teamProxy.match();

//监听充值请求
stripeProxy.recharge();

//一天更新一次排行榜
timmer.autoUpdateRankList(24 * 3600 * 1000);
io.listen(3000);



process.on('uncaughtException', function(err) {
    logger.logToFile("./logs/errors.txt", "append", String(err));
    console.log(String(err));
});


