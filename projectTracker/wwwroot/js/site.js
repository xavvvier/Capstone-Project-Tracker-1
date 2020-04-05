$('.menu .ui.dropdown').dropdown();

let timeoutWindow = 1000 * 60 * 38; //40 minutes - 2. Same as in Startup.cs@58. Give one minute room and another for the final warning
let warningInterval, finalInterval;

function restartAutoLogout() {
   window.clearInterval(warningInterval);
   window.clearInterval(finalInterval);
   warningInterval = window.setTimeout(function() {
      $('.ui.modal.timeout')
         .modal({ onApprove : restartAutoLogout })
         .modal('show');
      startFinalTimeout();
   }, timeoutWindow);
}

function startFinalTimeout() {
   finalInterval = window.setTimeout(function() {
      document.location = "/Login/Bye";
   }, 1000 * 60); // One minute after the warning, log out automatically
}

axios.interceptors.request.use(function (config) {
   restartAutoLogout();
   return config;
}, function (error) {
   // Do something with request error
   return Promise.reject(error);
});
