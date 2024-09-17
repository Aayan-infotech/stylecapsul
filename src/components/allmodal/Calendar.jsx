import React, { useState } from 'react';

const Calendar = () => {
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);

    return (
        <div>
            <div className="modal fade" id="openCalendarDialogCurrent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Select a Date</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            testing
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => alert(`Selected Date: ${selectedDate}`)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
