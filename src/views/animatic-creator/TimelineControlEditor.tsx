import * as React from 'react';
import { render } from 'react-dom';
import Timeline from 'react-scenejs-timeline';
import Scene from 'scenejs';
import { zoomIn } from '@scenejs/effects';

import './TimelineControlEditor.css';

export default class TimelineControlEditor extends React.Component {
    scene: Scene;
    timeline: Timeline;
    constructor(props: Readonly<{}>) {
        super(props);
        this.scene = new Scene();
    }
    render() {
        return (
            <div>
                <div class="background">
                    <div class="flower roundpetal petal5 flower1">
                        <div class="petal">
                            <div class="petal">
                                <div class="petal"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flower roundpetal petal5 flower2 blueflower">
                        <div class="petal">
                            <div class="petal">
                                <div class="petal"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flower roundpetal petal5 flower3 yellowflower">
                        <div class="petal">
                            <div class="petal">
                                <div class="petal"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flower roundpetal petal5 flower4 purpleflower">
                        <div class="petal">
                            <div class="petal">
                                <div class="petal"></div>
                            </div>
                        </div>
                    </div>
                    <div class="slope"></div>
                    <div class="tree">
                        <div class="leaf leaf1"></div>
                        <div class="leaf leaf2"></div>

                        <div class="branch left branch1">
                            <div class="branch left branch-inner1">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="heart flower1 blueflower"></div>
                            </div>
                            <div class="branch left branch-inner2">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="tulip flower1 redflower">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="branch left branch-inner3">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                            </div>
                            <div class="flower petal5 flower1 redflower">
                                <div class="petal">
                                    <div class="petal">
                                        <div class="petal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="branch right branch2">
                            <div class="branch left branch-inner1">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="flower petal5 flower1 blueflower">
                                    <div class="petal">
                                        <div class="petal">
                                            <div class="petal"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="branch right branch-inner2">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="tulip flower1 greenflower">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="branch right branch-inner3">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="branch left branch-inner4">
                                    <div class="leaf leaf1"></div>
                                    <div class="flower petal5 flower1 yellowflower">
                                        <div class="petal">
                                            <div class="petal">
                                                <div class="petal"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tulip flower1 purpleflower">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="flower petal5 roundpetal flower1">
                                <div class="petal">
                                    <div class="petal">
                                        <div class="petal">
                                            <div class="petal"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="branch left branch3">
                            <div class="branch right branch-inner1">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="heart flower1"></div>
                            </div>
                            <div class="branch left branch-inner2">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="tulip flower1">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="leaf leaf1"></div>
                            <div class="leaf leaf2"></div>
                            <div class="flower roundpetal petal5 flower1 purpleflower">
                                <div class="petal">
                                    <div class="petal">
                                        <div class="petal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="branch right branch4">
                            <div class="branch left branch-inner1">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="flower petal5 flower1 yellowflower">
                                    <div class="petal">
                                        <div class="petal">
                                            <div class="petal"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="branch right branch-inner2">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="tulip tulip1 flower1 purpleflower">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="flower petal5 roundpetal flower1">
                                <div class="petal">
                                    <div class="petal">
                                        <div class="petal">
                                            <div class="petal"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="branch left branch5">
                            <div class="branch right branch-inner1">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="heart flower1"></div>
                            </div>
                            <div class="branch left branch-inner2">
                                <div class="leaf leaf1"></div>
                                <div class="leaf leaf2"></div>
                                <div class="leaf leaf3"></div>
                                <div class="tulip flower1 greenflower">
                                    <div class="peak"></div>
                                </div>
                            </div>
                            <div class="flower roundpetal petal5 flower1 blueflower">
                                <div class="petal">
                                    <div class="petal">
                                        <div class="petal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-rotor">
                    <div class="card-wrapper forward">
                        <div class="card">
                            <div class="mark">
                                <div class="crown">
                                    <div class="left"></div>
                                    <div class="center"></div>
                                    <div class="right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-wrapper backward">
                        <div class="card">
                            <div class="mark">K</div>
                        </div>
                    </div>
                    <div class="shadow"></div>
                </div>
                <Timeline
                    ref={(e: Timeline) => {
                        this.timeline = e;
                    }}
                    scene={this.scene}
                    style={{
                        maxHeight: '700px',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
            </div>
        );
    }
    componentDidMount() {
        var sceneTree = new Scene(
            {
                '.tree': {
                    0: { transform: 'scale(0)' },
                    1.5: { transform: 'scale(1)' },
                },
                '.background>.flower': function (i) {
                    return {
                        0: { opacity: 0, transform: 'translateY(0px) rotate(0deg)' },
                        1: { opacity: 1 },
                        4: { opacity: 1 },
                        5: { opacity: 0, transform: 'translateY(300px) rotate(360deg)' },
                        options: {
                            delay: 7 + i,
                            iterationCount: 'infinite',
                        },
                    };
                },
            },
            {
                selector: true,
            }
        );

        this.scene.load(
            {
                '.tree': {
                    0: { transform: 'scale(0)' },
                    1.5: { transform: 'scale(1)' },
                    1.75: { transform: 'translate(100%,100%)' },
                },
                // ".background>.flower": function (i) {
                //   return {
                //     0: { opacity: 0, transform: "translateY(0px) rotate(0deg)" },
                //     1: { opacity: 1 },
                //     4: { opacity: 1 },
                //     5: { opacity: 0, transform: "translateY(300px) rotate(360deg)" },
                //     options: {
                //       delay: 7 + i,
                //       iterationCount: "infinite"
                //     }
                //   };
                // }
                '.card-wrapper.forward': {
                    // 0: {
                    //   transform: "rotateY(0deg)"
                    // },
                    // 2: {
                    //   transform: "rotateY(360deg)"
                    // }
                    0: { transform: 'scale(0)' },
                    2: { transform: 'scale(1)' },
                },
                '.card-wrapper.backward': {
                    // 0: {
                    //   transform: "rotateY(180deg)"
                    // },
                    // 2: {
                    //   transform: "rotateY(540deg)"
                    // }
                    0: { transform: 'scale(1)' },
                    2: { transform: 'scale(0)' },
                },
                '.shadow': {
                    0: {
                        transform: 'scaleX(1)',
                        easing: 'ease-in',
                    },
                    0.5: {
                        transform: 'scaleX(0.16)',
                        easing: 'ease-out',
                    },
                    1: {
                        transform: 'scaleX(1)',
                    },
                    options: {
                        iterationCount: 2,
                    },
                },
            },
            {
                selector: true,
                iterationCount: 'infinite',
            }
        );

        this.timeline.update(true);
        // var branchs = document.querySelectorAll(
        //   ".tree .branch, .tree .leaf, .tree .flower1"
        // );
        // var depths = [0, 0, 0];

        // for (var i = 0; i < branchs.length; ++i) {
        //   var sceneItem = sceneTree.newItem("item" + i);
        //   var className = branchs[i].className;

        //   if (~className.indexOf("branch-inner")) {
        //     ++depths[1];
        //     depths[2] = 0;
        //   } else if (~className.indexOf("branch")) {
        //     ++depths[0];
        //     depths[1] = 0;
        //     depths[2] = 0;
        //   } else if (~className.indexOf("leaf") || ~className.indexOf("flower1")) {
        //     ++depths[2];
        //   }
        //   sceneItem.setElement(branchs[i]);
        //   sceneItem.setCSS(0, ["transform"]);

        //   var time = 1 + depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        //   sceneItem.set(time, "transform", "scale", 0);
        //   sceneItem.set(time + 1, "transform", "scale", 1);
        // }

        // sceneTree.playCSS();
    }
}
