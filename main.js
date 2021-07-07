class Pyfuck{
    constructor(){
        this.Decimal_list = [
            "str(int())", "str(len([[]]))", "str(len([[],[]]))", "str(len([[],[],[]]))",
            "str(len(str([[]])))", "str(len(str([[]]))+len([[]]))", "str(len([[],[]])*len([[],[],[]]))",
            "str(len(str([[]]))+len([[],[],[]]))", "str(len(str([[]]))*len([[],[]]))", "str(len([[],[],[]])**len([[],[]]))"];
        this.pasttext = 'hey';
        this.pastmode = "bin";
        }
    print(){
        this.code = document.getElementById("input");
        console.log(this.code.value);
    }
    print_out(){
        this.select=document.getElementById("select");
        let selected_num = this.select.selectedIndex;
        let selected = this.select.options[selected_num].value;
        this.out = document.getElementById("output");
        /*this.out.scrollTop = this.out.scrollHeight;*/
        this.out.value = this.change(selected);
    }

    change(mode){
        this.code = document.getElementById("input");
        if (this.code.value == this.pasttext && mode==this.mode){
            return this.out.value;
        }else{
            this.out.scrollTop = this.out.scrollHeight;
            this.pasttext = this.code.value;
            this.mode=mode
            switch (mode) {
                case "bin":
                    return `exec(str().join(map(chr,(${this.command_list_bin(this.code.value)}))))`;
                case "decimal":
                    return `exec(str().join(map(chr,(${this.command_list_decimal(this.code.value)}))))`;
            }
        }
    }
    zero_one(number){
        let r_list = [];
        let zo=(a)=>{if (a=="1"){return "str(len([[]]))";}else{return "str(int())";}};
        let bin = number.toString(2);
        for (let i=0;i<bin.length;i++){
            r_list.push(zo(bin[i]));
        }
        return r_list.join("+");
    }
    decimal(number){
        let r_list=[];
        let zo=(a)=>{return this.Decimal_list[a];}
        let num = number.toString();
        for (let i=0;i<num.length;i++){
            r_list.push(zo(num[i]));
        }
        return r_list.join("+");
    }
    chrs(sen){
        let r_list=[];
        for (let i=0;i<sen.length;i++){
            r_list.push(sen[i].codePointAt(0));
        }
        return r_list;
    }
    command_list_decimal(sen){
        let r_list=[];
        let chr=this.chrs(sen);
        for (let j=0;j<chr.length;j++){
            r_list.push(`int(${this.decimal(chr[j])})`);
        }
        return r_list.join(",");
    }
    command_list_bin(sen){
        let r_list=[];
        let chr=this.chrs(sen);
        for (let j=0;j<chr.length;j++){
            r_list.push(`int(str(int())+str(id)[len([[]])]+str(${this.zero_one(chr[j])}),int())`);
        }
        return r_list.join(",");
    }
}
const p = new Pyfuck();
setInterval("p.print_out()",100);