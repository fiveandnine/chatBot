import React, {
    Component
} from 'react';
import './UploadImg.css';
import util from '../../util/util';
class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: 'assets/img/addPic.png'
        }
    }

    componentDidMount() {
        this.setState({})
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, nextProps.defaultUrl);
        if (this.props.defaultUrl != nextProps.defaultUrl) {
            this.state.imgUrl = nextProps.defaultUrl
        }
    }

    getImgUrl = (e) => {
        let that =this;
        let file = e.target.files[0];
        console.log(file.size);
        if (window.FileReader) {
            let fr = new FileReader();
            fr.onloadend = (e) => {
                this.setState({
                    imgUrl: e.target.result   //base64
                });
                let img = new Image();
                img.src = e.target.result;
                //图片加载完毕之后进行压缩，然后上传
                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }


                function callback() {
                    console.log(file.size);
                    if(file.size<300000){
                        that.props.getImgData(file, that.props.imgNo);
                    }else{
                        let data = util.compress(img);
                        that.props.getImgData(util.transformBlob(data, "image/jpeg"), that.props.imgNo);
                        img = null;
                    }

                }
            };
            fr.readAsDataURL(e.target.files[0]);
        }
        this.setState({
            imgUrl: e.target.value
        })
    }


    render() {
        return (
            <div className="uploadCom">
                <div className="uploadImg">
                    <input className="inputImg" type="file"
                           accept="image/*"
                           onChange={this.getImgUrl}/>
                    <div>
                        <img src={this.state.imgUrl}/>
                    </div>

                </div>
                <div
                    className="uploadTitle">{this.props.title}</div>
            </div>

        );
    }
}

export default UploadImg;