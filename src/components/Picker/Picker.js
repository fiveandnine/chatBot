import React, {
    Component
} from 'react';

class Picker extends Component {

    render() {
        return (
            <div className="Picker_bg">
                <div className="PickerModule">
                    <div className="PickerHeader"></div>
                    <div className="PickerContent">
                        <div className="content-col1"></div>
                        <div className="content-col2"></div>
                        <div></div>
                    </div>
                    <div className="PickerNavbar"></div>
                </div>
            </div>
        );
    }
}

export default Picker;