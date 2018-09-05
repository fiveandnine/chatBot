import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import './PullToRefresh.css';
const THROTTLES = {
    DRAG: 50,
    SCROLL: 80,
};
const TIPS = {
    SCROLLING: '加载更多',
    NO_MORE_SCROLLING: '没有更多了',
    DRAGGING: '',//松开刷新
    LOADING: ''//刷新中
};

class PullToRefresh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needDragLoading: this.props.needDragLoading,
            needScrollLoading: this.props.needScrollLoading,
            isScrollLoading: false,
            tip: TIPS.DRAGGING
        }
    }

    start = 0;                                        // 下拉刷新初始位置
    end = 0;                                          // 下拉刷新结束位置
    canStartDrag = true;
    isDragLoading = false;

    componentDidMount() {
        this.setState({isFinished: false});
        if (this.state.needScrollLoading) {
            window.addEventListener('scroll', this.scrolling, false);
        }

        if (this.state.needDragLoading) {
            window.addEventListener('touchstart', this.startDrag);
            window.addEventListener('touchmove', throttle(this.keepDrag, 16), { passive: false });
            window.addEventListener('touchend', this.endDrag);
        }
    }

    componentWillUnmount() {
        if (this.state.needScrollLoading) {
            window.removeEventListener('scroll', this.scrolling);

        }

        if (this.state.needDragLoading) {
            window.removeEventListener('touchstart', this.startDrag);
            window.removeEventListener('touchmove', this.keepDrag);
            window.removeEventListener('touchend', this.endDrag);
        }
    }

    componentWillReceiveProps(nextProps) {
        //如果之前是滚动状态，则恢复
        if (this.state.isScrollLoading) {
            this.scrollLoadingDone();
        }
        this.setState({isFinished: true});
        // if (!nextProps.needDragLoading) {
        //   //当不需要滑动加载时，去除元素中的style（transform）属性，避免对其他容器元素产生影响
        //   this.refs.container.style = '';
        // }
    }
    startDrag = (e) => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //页面滚动的距离

        if (!this.props.needDragLoading) {
            return;
        }

        if (scrollTop <= 0 && this.canStartDrag) {
            this.setState({
                tip: TIPS.DRAGGING
            });
            this.canStartDrag = false;
            this.isDragLoading = true;
            this.start = e.touches[0].pageY;

            this.setTransition(0);
        }
    };

    keepDrag = (e) => {
        if (!this.props.needDragLoading) {

            return;
        }

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //页面滚动的距离
        if (scrollTop <= 0 && this.isDragLoading) {
            this.end = e.touches[0].pageY;

            if (this.start < this.end) {
                e.preventDefault();

                const distance = this.end - this.start;
                let translate = 0;

                if (distance < THROTTLES.DRAG) {
                    translate = this.end - this.start;
                } else if (THROTTLES.DRAG < distance < 2 * THROTTLES.DRAG) {
                    translate = 0.5 * (distance + THROTTLES.DRAG);
                } else {
                    translate = 0.2 * distance + 1.1 * THROTTLES.DRAG;
                }

                this.setTranslate(translate);
            }
        }
    };

    endDrag = () => {
        if (!this.props.needDragLoading) {

            return;
        }

        if (this.isDragLoading) {
            this.isDragLoading = false;

            if (this.end - this.start >= THROTTLES.DRAG) {
                this.setState({
                    tip: (
                        <div className="scroll_loading">
                            <div className="loadingDIV"></div>
                        </div>
                    )
                });
                this.props.onRefresh();
            }

            this.setTransition(2, 'cubic-bezier(.37,1.29,1,.34)');
            this.setTranslate(0);

            setTimeout(() => {
                this.canStartDrag = true;
                this.setTransition(0);

                this.setState(() => ({
                    tip: ''
                }))
            }, 2000)
        }
    };

    setTranslate = (value) => {
        this.refs.container.style.transform = `translate3d(0, ${value}px, 0)`;
        this.refs.container.style.WebkitTransform = `translate3d(0, ${value}px, 0)`;
    };

    setTransition = (value, func = '') => {
        if(this.refs.container !=undefined) {
            this.refs.container.style.transition = `all ${value}s ${func}`;
            this.refs.container.style.WebkitTransition = `all ${value}s ${func}`;
        }
    };

    scrolling = () => {
        if (this.state.isScrollLoading) {
            return;
        }

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //页面滚动的距离
        const containerHeight = this.refs.container.offsetHeight; //容器总高度
        const windowHeight = window.innerHeight; //页面可见高度
        // 达到滚动加载阀值
        if (containerHeight-windowHeight-scrollTop==0) {
            this.setState({
                isScrollLoading: true
            });
            !this.props.isOver &&  this.props.onLoadMore();

        }
    };

    scrollLoadingDone = () => {
        this.setState({
            isScrollLoading: false
        });
    };

    renderScrollLoadingState = () => {
        const { isScrollLoading } = this.state;

        if (!isScrollLoading) {
            return;
        }

        const { stl, isOver } = this.props;

        return (
            <div className="scroll_loading">
                {!isOver && <div className="refresh"><img alt=""/> </div>}
                <span className={`scroll_desc ${!isOver ? '' : 'no_scrolling'}`}>{!isOver ? TIPS.SCROLLING : TIPS.NO_MORE_SCROLLING}</span>
            </div>
        )
    };

    render() {
        const { children, needDragLoading } = this.props;
        const { tip, isScrollLoading,translate,transition } = this.state;

        return (
            <div ref="container" className="container" style={{ ...translate, ...transition }}>
                <div className="topDiv"></div>
                { needDragLoading && <div ref="dragArea" className="tip">{tip}</div>}
                <div>
                    {React.Children.map(children, (child) => {
                        return child;
                    })}
                </div>


                { isScrollLoading && this.renderScrollLoadingState() }
                <div className="topDiv"></div>

            </div>

        )
    }
}

// PullToRefresh.propTypes = {
//     needScrollLoading: PropTypes.bool,
//     needDragLoading: PropTypes.bool,
//     isOver: PropTypes.bool,
//     onLoadMore: PropTypes.func,
//     onRefresh: PropTypes.func
// };

PullToRefresh.defaultProps = {
    needScrollLoading: false,
    needDragLoading: false,
    isOver: false
};

export default PullToRefresh;
