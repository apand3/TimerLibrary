namespace SeesionTimer {
    const modalPopupName = "sessionPopup";
    const eventNames = "click mousemove scroll";
    const modalPopupMessage = "";
    class Timer {

        static timerSession = null;
        private _sessionStart = 5000;
        init(): void {

           
            this.observer(function (fn) {
                $('window').on(eventNames, fn);

            }, this)
           // this.start();
        }
        private start(): void {
            debugger
            Timer.timerSession = setTimeout(this.timeout, this._sessionStart)
            
        }
        private timeout(): void {
            debugger
            Timer.initModalPopup();
            $("#" + modalPopupName).modal();

        }
        private stop(): void {
            clearTimeout(Timer.timerSession);
            Timer.timerSession = null;
            window.location.href = "";

        }
        static initModalPopup(): void
        {
            let modalPopupString = '<div class="modal fade" id="' + modalPopupName+'"> \
              <div class="modal-dialog"> \
                <div class="modal-content"> \
                  <div class="modal-header"> \
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                    <h4 class="modal-title">Modal Title</h4> \
                  </div> \
                  <div class="modal-body"> \
                    <p>' + modalPopupMessage + '</p></div>  \
          <div class="modal-footer"> \
                    <button id="session-timeout-dialog-logout" type="button" class="btn btn-default" value="logout">Logout</button> \
                    <button id="session-timeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal" value="stay">Stay</button> \
                  </div> \
                </div> \
              </div> \
             </div>';
            $('body').append(modalPopupString)
        }
        private observer(fn: any, currentSessionObject): void {
            debugger
            fn.call(this, function (event) {
                let isModalPopupOpen = $("#" + modalPopupName).is(":visible");
                if (event.type == 'click' && isModalPopupOpen)
                {
                    let targetValue = event.currentTarget.value.toLowerCase();
                    switch (targetValue) {
                        case "logout":
                            clearTimeout(Timer.timerSession);
                            currentSessionObject.stop();
                            break;
                        case "stay":
                            Timer.timerSession = null;
                            currentSessionObject.start();
                            break;
                    }
                }
                else
                {
                    Timer.timerSession = null;
                    currentSessionObject.start();
                }
            })
        }

    }
    let timer = new Timer();
    timer.init();
}
