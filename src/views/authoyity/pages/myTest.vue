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
            <el-form ref="questionForm" :model="questionForm" :rules="rules">
                <el-form-item prop="resource1">
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
                <el-form-item prop="resource2">
                    <div style="padding:8px">
                        <h2>2:我害怕相信别人。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource2">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource3">
                    <div style="padding:8px">
                        <h2>3:我没觉得我有伴侣（或男／女朋友）。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource3">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource4">
                    <div style="padding:8px">
                        <h2>4:当分担我的困难时，我的好友觉得是个负担。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource4">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource5">
                    <div style="padding:8px">
                        <h2>5:我觉得别人不依赖我，也不觉得我重要。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource5">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource6">
                    <div style="padding:8px">
                        <h2>6:我觉得我无法跟任何人交心。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource6">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource7">
                    <div style="padding:8px">
                        <h2>7:我觉得不被理解。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource7">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource8">
                    <div style="padding:8px">
                        <h2>8:我觉得求别人并不安全。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource8">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource9">
                    <div style="padding:8px">
                        <h2>9:我感到孤独。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource9">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="resource10">
                    <div style="padding:8px">
                        <h2>10:我觉得是任何社团或组织中的一员。</h2>
                        <div style="margin:16px 16px 0 16px">
                            <el-radio-group v-model="questionForm.resource10">
                                <el-radio value="A" label="偶尔如此"></el-radio>
                                <el-radio value="B" label="有时如此"></el-radio>
                                <el-radio value="C" label="经常如此"></el-radio>
                                <el-radio value="D" label="通常如此"></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item style="margin:16px 16px 0 16px" >
                    <el-button @click="handlerReset('questionForm')">重置</el-button>
                    <el-button @click="handlerSubmit('questionForm')">提交</el-button>

                </el-form-item>
            </el-form>
        </div>  
        <el-dialog title="结果" :visible.sync="resultDialog">
            <div class="all_result">
                <div>
                    <b><span >我的得分：{{resultGrade}}</span> </b>
                </div>
            <span class="fb">参考标准：</span> 
            <p>
                <table style="width:98%;" class="table-c">
                    <tbody>
                        <tr>
                            <td>
                                得分
                            </td>
                            <td>
                                孤独程度
                            </td>
                        </tr>
                        <tr>
                            <td>
                                0-2.5分
                            </td>
                            <td>
                                无或几无孤独
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2.5-5分
                            </td>
                            <td>
                                一般的<span>孤独</span> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5-7.5分
                            </td>
                            <td>
                                高于一般人的<span>孤独</span> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                7.5-10分
                            </td>
                            <td>
                                <span>孤独</span>问题严重
                            </td>
                        </tr>
                    </tbody>
                </table>
            </p>
        </div>
        </el-dialog>
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
            resultDialog:false,
            resultGrade:"",
            resultGradeDes:"",
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
            },
            rules: {
                resource1: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource2: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource3: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource4: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource5: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource6: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource7: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource8: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource9: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
                resource10: [
                { required: true, message: '请做出你的选择', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        handlerReset(formName){
            this.$refs[formName].resetFields();
        },
        handlerSubmit(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            var grade=0;
            if(this.questionForm.resource1==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource1==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource1==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource1==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource2==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource2==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource2==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource2==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource3==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource3==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource3==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource3==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource4==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource4==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource4==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource4==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource5==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource5==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource5==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource5==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource6==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource6==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource6==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource6==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource7==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource7==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource7==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource7==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource8==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource8==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource8==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource8==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource9==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource9==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource9==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource9==="偶尔如此"){
               grade=grade+1; 
            }

            if(this.questionForm.resource10==="通常如此"){
                grade=grade+0.25;
            }else if(this.questionForm.resource10==="经常如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource10==="有时如此"){
               grade=grade+0.5; 
            }else if(this.questionForm.resource10==="偶尔如此"){
               grade=grade+1; 
            }
            this.resultDialog=true;
            this.resultGrade=grade;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
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