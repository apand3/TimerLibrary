﻿namespace SeesionTimer {
    const modalProperties =
        {
        modalPopupName: "sessionModal",
        modalPopupMessage: "Your session is about to expire",
        modalTitle: "Session"
         }

    class Timer {

        static timerSession = null;
        private options =
        {
            events: "click mousemove mousedown scroll",
            logoutUrl: "",
            sessionTime: 15000,
            windowPath: window.location.pathname
        }
        init(): void {

            this.observer(function (fn) {
                $(window).on(this.options.events, fn);
            }, this);
            this.start();
        }
        private start(): void
        {
            Timer.timerSession = setTimeout(this.timeout, this.options.sessionTime)
            
        }
        private timeout(): void
        {
            Timer.initModalPopup();
            $("#" + modalProperties.modalPopupName).modal();

        }
        private stop(): void
        {
            clearTimeout(Timer.timerSession);
            Timer.timerSession = null;
            window.location.href = this.options.logoutUrl;

        }
        static initModalPopup(): void
        {
            let modalPopupString = '<div class="modal fade" id="' + modalProperties.modalPopupName +'"> \
              <div class="modal-dialog"> \
                <div class="modal-content"> \
                  <div class="modal-header"> \
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                    <h4 class="modal-title">'+ modalProperties.modalTitle +'</h4> \
                  </div> \
                  <div class="modal-body"> \
                    <p>' + modalProperties.modalPopupMessage + '</p></div>  \
          <div class="modal-footer"> \
                    <button id="logout" type="button" class="btn btn-default" value="logout">Logout</button> \
                    <button id="keepalive" type="button" class="btn btn-primary" data-dismiss="modal" value="keep">Stay</button> \
                  </div> \
                </div> \
              </div> \
             </div>';
            $("body").append(modalPopupString);
        }
        private observer(fn: any, currentSessionObject): void {
            fn.call(this, function (event)
            {
                console.log(event.type);
                let isModalPopupOpen = $("#" + modalProperties.modalPopupName).is(":visible");
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
