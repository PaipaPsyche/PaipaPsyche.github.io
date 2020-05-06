



function dec_to_base(n,b,len){
  let s = (n).toString(b)
  while(s.length<len){
    s = "0"+s
  }

  return s
}

function base_to_dec(n,b){
  return parseInt(n,b);
}


function cymk_to_rgb(col){
  let r = (1-col[0])*(1-col[3])*255;
  let g = (1-col[1])*(1-col[3])*255;
  let b = (1-col[2])*(1-col[3])*255;
  return [int(r),int(g),int(b)];
}

function rule_to_num(rule,group){
  let n_groups =  rule.length/group;
  if(n_groups-int(n_groups)!=0){
    console.log("rule length incompatible with grouping length. "+n_groups+" groups")
    return;
  }
  let ans =[];
  for(let i =0;i<n_groups;i++){
    let segment = rule.slice(i*group,(i+1)*group);
    ans.push(base_to_dec(segment,2))
  }
  return ans

}

function num_to_rule(nums,group){
  let rule =""

  for(let i=0;i<nums.length;i++){
    let str = nums[i].toString(2)
    while(str.length<group){
      str = "0"+str
    }
    rule = rule+str
  }

  return rule;
}


function hiper_encode_rule(rule){
  let num = rule_to_num(rule,32) //16 groups of 32bits
  for(let i=0;i<num.length;i++){
    num[i]=(num[i]).toString(36)
  }

  return num.join(CHARS.sep);
}


function hiper_decode_rule(str){
  let  nums = str.split(CHARS.sep)
  let ans = [];
  for(let i =0;i<nums.length;i++){
    ans.push(parseInt(nums[i],36))
  }

  return num_to_rule(ans,32);
}


function rule_to_colors(rule){
  let numbers = rule_to_num(rule,8);
  let n_colors = numbers.length/4; //CYMK
  if(n_colors-int(n_colors)!=0){
    console.log("array length incompatible with color grouping length. "+n_colors+" colors")
    return;
  }

  let ans = [];

  for(let i = 0; i<n_colors;i++){
    let cymk = [numbers[i*4]/255,numbers[i*4+1]/255,numbers[i*4+2]/255,numbers[i*4+3]/255]//normalizing

    let rgb = cymk_to_rgb(cymk);
    ans.push(rgb);
  }
  return ans;
}
