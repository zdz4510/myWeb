<template>
    <div id="myTest">
        <div class="topInfo">
            <div style="margin:8px 8px;border-bottom: 1px #DDD solid;">
                <h1 style="color:#39f">情绪一社交孤独问卷 - 情绪孤独</h1>
            </div>
            <div style="text-align: right;margin:8px 8px;">
                本测试共10题
            </div>
        </div>
        <div class="quesation">
            <el-form ref="questionForm" :model="questionForm">
                <el-form-item>
                    <div style="padding:8px">
                        <h2>1:我没觉得有挚友。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource1">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>2:我害怕相信别人。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource2">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>3:我没觉得我有伴侣（或男／女朋友）。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource3">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>4:当分担我的困难时，我的好友觉得是个负担。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource4">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>5:我觉得别人不依赖我，也不觉得我重要。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource5">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>6:我觉得我无法跟任何人交心。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource6">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>7:我觉得不被理解。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource7">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>8:我觉得求别人并不安全。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource8">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>9:我感到孤独。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource9">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="padding:8px">
                        <h2>10:我觉得是任何社团或组织中的一员。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="resource10">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>  
        <!-- <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>  -->
    </div>
</template>

<script>
export default {
    name:'myTest',
    data(){
        return {
            questionForm:{
                resource1:"",
                resource2:"",
                resource3:"",
                resource4:"",
                resource5:"",
                resource6:"",
                resource7:"",
                resource8:"",
                resource9:"",
                resource10:"",
            }
        }
    },
    methods:{

    },
    created(){

    }
}
</script>

<style lang="scss">
    #myTest{
        .topInfo{
            background-color:#ededed;
            
        }   
        .quesation{
            .el-form-item{
                margin-bottom:8px;
            }
        }
    }
</style>