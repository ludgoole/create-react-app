import React, { Component } from 'react';
import './style.css';

//父组件
class Board extends Component{
  //初始状态  =>元数据
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {
      comments: []
    };

    // ES6 类中函数必须手动绑定
    /****************************************************************
     *1.构造函数中绑定
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); 
      }

    *2.使用bind来绑定
      <div onClick={this.handleClick.bind(this)}></div> 

    *3.使用bind来绑定
      <div onClick={()=>this.handleClick()}></div> //使用arrow function来绑定
     */

    this.updateComment = this.updateComment.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.eachComment = this.eachComment.bind(this);
    
  }

  //更新评论  =>newText: 子组件数据
  updateComment(newText,i){
    var arr = this.state.comments;
    arr[i] = newText;
    // 更新状态
    this.setState({comments: arr});
  };

  //删除子组件		
  remove(i){
    var arr = this.state.comments;
    arr.splice(i,1);
    // 更新状态
    this.setState({comments: arr});
  };

  //添加子组件
  add(text){
    var arr = this.state.comments;
    arr.push(text);
    // 更新状态
    this.setState({comments: arr});
  };

  //生成子组件
  eachComment(text,i){
    return (
      <Comment deleteFromBoard={this.remove} updateCommentText={this.updateComment} key={i} index={i}>{text}</Comment>
    );
  };

  render(){
    return (
      <div>
        <button onClick={this.add.bind(null,"Default text")} className="button-info create">Add New</button>
        <div className="board">
        {
          this.state.comments.map(this.eachComment)
        }
        </div>
      </div>
    );
  }
};

//子组件
class Comment extends Component{
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  //编辑评论
  edit(){
    //状态改变
    this.setState({editing: true});
  };

  //删除组件
  remove(){
    //调用父组件方法，接收父组件数据  =>callback
    this.props.deleteFromBoard(this.props.index);
  };

  //保存评论
  save(){
    //获取输入值
    var val = this.refs.newText.value;
    //调用父组件方法，传递子组件数据，接收父组件数据 =>callback  
    this.props.updateCommentText(val,this.props.index);
    //状态改变
    this.setState({editing: false});
  };

  renderNormal(){
    return (
      <div className="commentContainer">
        <div>{this.props.children}</div>
        <button onClick={this.edit} className="button-primary">Edit</button>
        <button onClick={this.remove} className="button-danger">Remove</button>
      </div>
    );
  };
  
  renderForm(){
    return (
      <div className="commentContainer">
        <textarea ref="newText" defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className="button-success">Save</button>
      </div>
    )
  };


  render(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderNormal();
    }
  }
};

export default Board;
