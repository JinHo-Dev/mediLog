let user_id;
let medData = [];
let medList = [];
let logs = [];
let lastSettingIndex = -1;

function selectShape(j) {
    document.querySelector('#shapePick').dataset.i = j;
    const shapes = document.querySelectorAll('#shapePick>img');
    shapes.forEach(elem => {
        elem.className = '';
    });
    shapes[j].className = 'selected';
}

function drawList() {
    const key = document.getElementById('query').value;
    const z = medList.length;
    let s = '';
    for(let i = 0; i < z; i++) {
        if(!key || medList[i][1].indexOf(key) > -1) {
            s += `<div data-i="${i}">`;
            s += `<div>${medList[i][1]}</div>`;
            s += `<div>${medList[i][2]}</div>`;
            s += `<div>${medList[i][3]}</div>`;
            s += `<img src='img/${medList[i][4]}.png'>`;
            s += '</div>';
        }
    }
    document.getElementById('list').innerHTML = s+'<div class="space">&nbsp;</div>';
    const lists = document.querySelectorAll('#list>div');
    lists.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(!e.currentTarget.dataset.i) return;
            let i = e.currentTarget.dataset.i;
            backg.style.display = 'none';
            lists.forEach(elem => {elem.className = '';});
            e.currentTarget.className = 'selected';
            bigName.innerText = medList[i][1];
            takeBtn.dataset.medi = medList[i][0];
            document.getElementById('blocking_paper').style.display = 'block';
            document.getElementById('paper').style.display = 'block';
            getLog(medList[i][0]);
            let detailTxt = '';
            if(medList[i][6] == 0) detailTxt += '필요에 따라 ';
            else if(medList[i][6] == 1) detailTxt += '매일 ';
            else if(medList[i][6] == 2) detailTxt += '이틀마다 ';
            else if(medList[i][6] == 3) detailTxt += '매주 ';
            else if(medList[i][6] == 4) detailTxt += '격주 ';
            if(medList[i][6] && medList[i][7] & 1) detailTxt += '아침 ';
            if(medList[i][6] && medList[i][7] & 2) detailTxt += '점심 ';
            if(medList[i][6] && medList[i][7] & 4) detailTxt += '저녁 ';
            if(medList[i][6] && medList[i][7] & 8) detailTxt += '취침 전 ';
            if(medList[i][6]) detailTxt += '복용합니다. <br>';
            detailTxt += '마지막 복용 : ' + (medList[i][8] ? medList[i][8] : "기록 없음");
            detail.innerHTML = detailTxt + "<br><br><br><br><font id='data_go_kr'><center style='font-size: 14px; color: #aaa;'><br><img src='loading.gif' width=32 height=32><br>효능과 부작용을 검색중입니다<br>잠시만 기다려주세요</center></font>";
            dataDetail(medList[i][1]);
        });
    });
}

function dataDetail(name) {
    name = name.replaceAll(/ /gi, '');
    name = name.replaceAll(/[^0-9가-힣a-zA-Z]/gi, '');
    let y = new FormData();
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            data_go_kr.innerHTML = x.response;
        }
    }
    x.open('GET', 'data.php?search=' + encodeURI(name), true); 
    x.send(y);
}

function drawSettingList(j) {
    const key = document.getElementById('query').value;
    const z = medData.length;
    let s = '';
    for(let i = 0; i < z; i++) {
        s += `<div data-i="${i}">`;
        s += `${medData[i][1]}`;
        s += '</div>';
    }
    document.getElementById('settingList').innerHTML = '<div id="addBtn" onclick="addNew()">새 항목 추가</div>' + s;
    const lists = document.querySelectorAll('#settingList>div');
    lists.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(!e.currentTarget.dataset.i) return;
            let i = e.currentTarget.dataset.i;
            lastSettingIndex = i - 0;
            lists.forEach(elem => {elem.className = '';});
            e.currentTarget.className = 'selected';
            document.querySelector("#settingPaper>input").value = medData[i][1];
            saveBtn.dataset.medi = medData[i][0];
            deleteBtn.dataset.medi = medData[i][0];
            document.querySelectorAll(".WheelPicker>select")[0].selectedIndex = medData[i][2].substring(0, 4) - 2018;
            document.querySelectorAll(".WheelPicker>select")[1].selectedIndex = medData[i][2].substring(5, 7) - 1;
            document.querySelectorAll(".WheelPicker>select")[2].selectedIndex = medData[i][2].substring(8, 10) - 1;
            document.querySelectorAll(".WheelPicker>select")[3].selectedIndex = medData[i][3] - 0;
            document.querySelector(".WheelPicker").WheelPicker.reloadAll();
            document.querySelectorAll("#abcPick>div")[0].className = (medData[i][4] & 1 ? "selected" : "");
            document.querySelectorAll("#abcPick>div")[1].className = (medData[i][4] & 2 ? "selected" : "");
            document.querySelectorAll("#abcPick>div")[2].className = (medData[i][4] & 4 ? "selected" : "");
            document.querySelectorAll("#abcPick>div")[3].className = (medData[i][4] & 8 ? "selected" : "");
            selectShape(medData[i][5]);
        });
    });
    if(j) document.querySelectorAll("#settingList>div")[j].click();
}

function addNew() {
            const lists = document.querySelectorAll('#settingList>div');
            lists.forEach(elem => {elem.className = '';});
            addBtn.className = 'selected';
            saveBtn.dataset.medi = -1;
            deleteBtn.dataset.medi = -1;
            document.querySelector("#settingPaper>input").value = "";
            document.querySelectorAll(".WheelPicker>select")[0].selectedIndex = new Date().getYear() - 118;
            document.querySelectorAll(".WheelPicker>select")[1].selectedIndex = new Date().getMonth();
            document.querySelectorAll(".WheelPicker>select")[2].selectedIndex = new Date().getDate() - 1;
            document.querySelectorAll(".WheelPicker>select")[3].selectedIndex = 0;
            if(document.querySelector(".WheelPicker").WheelPicker) document.querySelector(".WheelPicker").WheelPicker.reloadAll();
            document.querySelectorAll("#abcPick>div")[0].className = "";
            document.querySelectorAll("#abcPick>div")[1].className = "";
            document.querySelectorAll("#abcPick>div")[2].className = "";
            document.querySelectorAll("#abcPick>div")[3].className = "";
            selectShape(0);
}

function getMedi(j) {
    let y = new FormData();
    y.append('id', user_id);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            medData = [];
            let temp = x.response.split('\n');
            temp.forEach(elem => {
                let temp2 = elem.split('\t');
                if(temp2.length == 1) return;
                medData.push(temp2);
            });
            medList = [];
            medData.forEach(elem => {
                let arr = [elem[0]-0, elem[1], dateFormat(elem[7]), dateReserved(elem[2], elem[3], elem[4], elem[7]), elem[5], elem[6], elem[3], elem[4], elem[7]];
                medList.push(arr);
            });
            medData.reverse();
            medList.sort((a, b) => {
                if(a[3] > b[3]) return -1;
                else if(a[3] < b[3]) return 1;
                else if(a[8] > b[8]) return -1;
                else if(a[8] < b[8]) return 1;
                else if(a[0] > b[0]) return -1;
                else return 1;
            });
            drawList();
            drawSettingList(j);
        }
    }
    x.open('POST', 'getmedi.php', true); 
    x.send(y);
}

function getLog(medi) {
    const tdy = countDays(new Date().getYear() + 1900, new Date().getMonth() + 1, new Date().getDate());
    const lmt = tdy - ((tdy+4)%7) + 7;
    const calendar = document.querySelectorAll("#calen tr div");
    const marked = document.querySelectorAll("#calen tr .selected");
    marked.forEach(elem => {
        elem.className = '';
    });
    const z = calendar.length;
    let y = new FormData();
    y.append('id', user_id);
    y.append('medi', medi);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            let temp = x.response.split('\n');
            logd.innerHTML = '';
            logs = [];
            temp.forEach(elem => {
                if(elem.length == 0) return;
                let yy = elem.substring(0, 4)-0;
                let mm = elem.substring(5, 7)-0;
                let dd = elem.substring(8, 10)-0;
                let hh = elem.substring(11, 13)-0;
                let taken = countDays(yy, mm, dd);
                if(taken < lmt && taken >= lmt - 28) {
                    calendar[z - lmt + taken].className = 'selected';
                    logs.push([taken, elem]);
                }
            });
        }
    }
    x.open('POST', 'getlog.php', true); 
    x.send(y);
}

function dateFormat(str) {
    if(str == '') return "기록 없음";
    let yy = str.substring(0, 4)-0;
    let mm = str.substring(5, 7)-0;
    let dd = str.substring(8, 10)-0;
    let hh = str.substring(11, 13)-0;
    let mi = str.substring(14, 16)-0;
    let taken = countDays(yy, mm, dd);
    let tdy = countDays(new Date().getYear() + 1900, new Date().getMonth() + 1, new Date().getDate());
    if(taken == tdy) {
        if(new Date().getHours() == hh) return new Date().getMinutes() - mi + "분 전에 복용함";
        return new Date().getHours() - hh + "시간 전에 복용함";
    }
    else if(taken == tdy - 1) {
        return "어제 " + hh + "시에 복용함";
    }
    let vv = ['목', '금', '토', '일', '월', '화', '수'][taken % 7];
    return yy + "년 " + mm + "월 " + dd + "일 " + vv + "요일";
}

function dateReserved(date, term, wntk, take) {
    if(term == 0) return '';
    let yy = take.substring(0, 4)-0;
    let mm = take.substring(5, 7)-0;
    let dd = take.substring(8, 10)-0;
    let YY = date.substring(0, 4)-0;
    let MM = date.substring(5, 7)-0;
    let DD = date.substring(8, 10)-0;
    let hh = take.substring(11, 13)-0;
    let taken = countDays(yy, mm, dd);
    let tdy = countDays(new Date().getYear() + 1900, new Date().getMonth() + 1, new Date().getDate());
    if((tdy - countDays(YY, MM, DD)) % termCnt[term] != 0) {
        return '';
    }
    else if(countTime(new Date().getHours()) == 0.1 && (wntk & 1)) {
        if(taken == tdy && countTime(hh) == 0.1) return '';
        return '!';
    }
    else if(countTime(new Date().getHours()) == 0.2 && (wntk & 2)) {
        if(taken == tdy && countTime(hh) == 0.2) return '';
        return '!';
    }
    else if(countTime(new Date().getHours()) == 0.3 && (wntk & 4)) {
        if(taken == tdy && countTime(hh) == 0.3) return '';
        return '!';
    }
    else if(countTime(new Date().getHours()) == 0.4 && (wntk & 8)) {
        if(taken == tdy && countTime(hh) == 0.4) return '';
        return '!';
    }
    return '';
}

function getDateByTotal(hmm) {
    let ccyear, ccmonth, tmp;
    for(let i = 1841; i <= 2041; i++){
        if(i%400==0) tmp = 366;
        else if(i%4==0 && i%100==0) tmp = 365;
        else if(i%4==0) tmp = 366;
        else tmp = 365;
        if(hmm-tmp<=0) {
            ccyear = i;
            break;
        }
        else hmm -= tmp;
    }
    for(let i = 1; i <= 12; i++) {
        if(i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12) tmp = 31;
        else if(i==4 || i==6 || i==9 || i==11) tmp = 30;
        else if(ccyear%400==0) tmp = 29;
        else if(ccyear%4==0&&ccyear%100==0) tmp = 28;
        else if(ccyear%4==0) tmp = 29;
        else tmp = 28;
        if(hmm - tmp <= 0) {
            ccmonth = i;
            break;
        }
        else hmm -= tmp;
    }
    hmm -= 0;
    if(ccmonth > 12) {
        ccmonth--;
        ccyear += (ccmonth-ccmonth%12)/12;
        ccmonth = ccmonth%12;
        ccmonth++;
    }
    if([4,6,9,11].indexOf(ccmonth) > -1) {
        if(hmm > 30) hmm = 30;
    }
    else if(ccmonth==2) {
        if((ccyear%4==0 && ccyear%100==0 && ccyear%400==100)||(ccyear%4==0 && ccyear%100!=0)){
            if(hmm > 29) {
                hmm = 29;
            }
        }
        else if(hmm > 28) {
            hmm = 28;
        }
    }
    else if(hmm > 31) {
        hmm = 31;
    }
    return [ccyear, ccmonth, hmm];
}

function countDays(yy, mm, dd){
    let dys = 0;
    for(let i = 1841; i < yy; i++) {
        if(i%400==0 || (i%100!=0 && i%4==0)) dys += 366;
        else dys += 365;
    }
    for(let i = 1; i < mm; i++) {
        if([1,3,5,7,8,10,12].indexOf(i) > -1) dys += 31;
        else if(i != 2) dys += 30;
        else if(yy%400==0 || (yy%100!=0 && yy%4==0)) dys += 29;
        else dys += 28;
    }
    return dys + dd;
}

function countTime(hh){
    if(hh <= 10) return 0.1;
    else if(hh <= 15) return 0.2;
    else if(hh <= 20) return 0.3;
    else return 0.4;
}

function takeMedi(medi) {
    let y = new FormData();
    y.append('id', user_id);
    y.append('medi', medi);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            getLog(medi);
            detail.innerHTML = detail.innerHTML.replace(/마지막 복용 : [^<]+<br>/gi, "마지막 복용 : 지금 복용함<br>");
        }
    }
    x.open('POST', 'take.php', true); 
    x.send(y);
}

function editMedi(medi) {
    if(!medi) return;
    let y = new FormData();
    y.append('id', user_id);
    y.append('medi', medi);
    y.append('name', document.querySelector("#settingPaper>input").value);
    y.append('date', (document.querySelectorAll(".WheelPicker>select")[0].selectedIndex + 2018) + "-" + (document.querySelectorAll(".WheelPicker>select")[1].selectedIndex + 1) + "-" + (document.querySelectorAll(".WheelPicker>select")[2].selectedIndex + 1));
    y.append('term', document.querySelectorAll(".WheelPicker>select")[3].selectedIndex);
    y.append('wntk', (document.querySelectorAll("#abcPick>div")[0].className == "selected") + (document.querySelectorAll("#abcPick>div")[1].className == "selected") * 2 + (document.querySelectorAll("#abcPick>div")[2].className == "selected") * 4 + (document.querySelectorAll("#abcPick>div")[3].className == "selected") * 8);
    y.append('icon', document.querySelector("#shapePick").dataset.i);
    y.append('colr', 1);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            // console.log("done");
            getMedi(lastSettingIndex+1);
        }
    }
    x.open('POST', 'editmedi.php', true); 
    x.send(y);
}

function tryChange(tid) {
    tid -= 0;
    tid += 6249;
    tid %= 10000;
    let y = new FormData();
    y.append('id', tid - 0);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            if(x.response == 1) {
                localStorage.setItem("user_id", tid);
                user_id = tid;
                getMedi();
                shareClose.click();
            }
        }
    }
    x.open('POST', 'isvalid.php', true); 
    x.send(y);
}

function addMedi() {
    let y = new FormData();
    y.append('id', user_id);
    if(document.querySelector("#settingPaper>input").value.length == 0) y.append('name', '이름없는 복용약');
    else y.append('name', document.querySelector("#settingPaper>input").value);
    y.append('date', (document.querySelectorAll(".WheelPicker>select")[0].selectedIndex + 2018) + "-" + (document.querySelectorAll(".WheelPicker>select")[1].selectedIndex + 1) + "-" + (document.querySelectorAll(".WheelPicker>select")[2].selectedIndex + 1));
    y.append('term', document.querySelectorAll(".WheelPicker>select")[3].selectedIndex);
    y.append('wntk', (document.querySelectorAll("#abcPick>div")[0].className == "selected") + (document.querySelectorAll("#abcPick>div")[1].className == "selected") * 2 + (document.querySelectorAll("#abcPick>div")[2].className == "selected") * 4 + (document.querySelectorAll("#abcPick>div")[3].className == "selected") * 8);
    y.append('icon', document.querySelector("#shapePick").dataset.i);
    y.append('colr', 1);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            // console.log("done");
            getMedi(1);
        }
    }
    x.open('POST', 'addmedi.php', true); 
    x.send(y);
}

function deleteMedi(medi) {
    if(!medi) return;
    let y = new FormData();
    y.append('id', user_id);
    y.append('medi', medi);
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            // console.log("done");
            getMedi();
        }
    }
    x.open('POST', 'deletemedi.php', true); 
    x.send(y);
}

function register() {
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            user_id = x.response - 0;
            localStorage.setItem("user_id", user_id);
        }
    }
    x.open('POST', 'register.php', true); 
    x.send();
}

window.addEventListener('load', (e) => {
    if(localStorage.getItem("user_id")) {
        user_id = localStorage.getItem("user_id") - 0;
        getMedi();
    }
    else {
        register();
    }
    document.getElementById('getOut').addEventListener('click', (e) => {
        const nums = document.querySelectorAll('#numFrom>div');
        let t = user_id - 0 + 3751;
        nums[3].innerText = t%10;
        t -= t%10;
        t /= 10;
        nums[2].innerText = t%10;
        t -= t%10;
        t /= 10;
        nums[1].innerText = t%10;
        t -= t%10;
        t /= 10;
        nums[0].innerText = t%10;
        getOut.className = 'selected';
        getIn.className = '';
        numFrom.style.display = 'block';
        numTo.style.display = 'none';
        numInfo.innerText = '이 기기의 정보를 다른 기기에서 함께 사용하려면, 위 숫자를 해당 기기에 입력하세요';
    });
    document.getElementById('getIn').addEventListener('click', (e) => {
        getOut.className = '';
        getIn.className = 'selected';
        numFrom.style.display = 'none';
        numTo.style.display = 'block';
        numInfo.innerText = '타 기기의 정보를 이 기기에서 함께 사용하려면, 해당 기기에서 확인한 숫자를 입력하세요';
    });
    document.getElementById('closeBtn').addEventListener('click', (e) => {
        document.querySelector('#list>.selected').className = '';
        document.getElementById('blocking_paper').style.display = 'none';
        document.getElementById('paper').style.display = 'none';
    });
    document.getElementById('blocking_paper').addEventListener('click', (e) => {
        document.querySelector('#list>.selected').className = '';
        document.getElementById('blocking_paper').style.display = 'none';
        document.getElementById('paper').style.display = 'none';
    });
    document.getElementById('settingBtn').addEventListener('click', (e) => {
        document.getElementById('blocking_setting').style.display = 'block';
        document.getElementById('setting').style.display = 'block';
        WheelPickerStart();
        addNew();
    });
    document.getElementById('shareBtn').addEventListener('click', (e) => {
        document.getElementById('blocking_setting').style.display = 'block';
        document.getElementById('share').style.display = 'block';
        getOut.click();
    });
    document.getElementById('shareClose').addEventListener('click', (e) => {
        document.getElementById('blocking_setting').style.display = '';
        document.getElementById('share').style.display = '';
    });
    document.getElementById('settingClose').addEventListener('click', (e) => {
        document.getElementById('blocking_setting').style.display = '';
        document.getElementById('setting').style.display = '';
    });
    document.getElementById('blocking_setting').addEventListener('click', (e) => {
        document.getElementById('blocking_setting').style.display = '';
        document.getElementById('setting').style.display = '';
        document.getElementById('share').style.display = '';
    });
    document.getElementById('query').addEventListener('keyup', (e) => {
        drawList();
    });
    document.getElementById('takeBtn').addEventListener('click', (e) => {
        document.querySelectorAll('#list>.selected>div')[1].innerText = '지금 복용함';
        document.querySelectorAll('#list>.selected>div')[2].innerText = '';
        if(!e.currentTarget.dataset.medi) return;
        takeMedi(e.currentTarget.dataset.medi);
    });
    document.getElementById('saveBtn').addEventListener('click', (e) => {
        if(!e.currentTarget.dataset.medi) return;
        if(e.currentTarget.dataset.medi == -1) addMedi();
        else editMedi(e.currentTarget.dataset.medi);
    });
    document.getElementById('deleteBtn').addEventListener('click', (e) => {
        if(!e.currentTarget.dataset.medi) return;
        deleteMedi(e.currentTarget.dataset.medi);
    });
    document.querySelector('#numTo>input').addEventListener('keyup', (e) => {
        if(e.currentTarget.value.length < 4) return;
        tryChange(e.currentTarget.value);
        e.currentTarget.value = '';
    });
    const abc = document.querySelectorAll('#abcPick>div');
    abc.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(!e.currentTarget.className) e.currentTarget.className = 'selected';
            else e.currentTarget.className = '';
        });
    });
    let str = '';
    for(let i = 0; i < 18; i++) str += "<img>";
    document.querySelector('#shapePick').innerHTML = str;
    const shapes = document.querySelectorAll('#shapePick>img');
    let cnt = 0;
    shapes.forEach(elem => {
        elem.dataset.i = cnt;
        elem.src = "img/" + (cnt++) + ".png";
        elem.addEventListener('click', (e) => {
            if(!e.currentTarget.dataset.i) return;
            selectShape(e.currentTarget.dataset.i);
        });
    });
    const calendar = document.querySelectorAll("#calen tr div");
    const z = calendar.length;
    cnt = 0;
    const tdy = countDays(new Date().getYear() + 1900, new Date().getMonth() + 1, new Date().getDate());
    for(let i = (9 - ((tdy) % 7)) % 7; i < 28; i++) {
        calendar[z - i - 1].innerText = getDateByTotal(tdy - (cnt))[2];
        calendar[z - i - 1].dataset.date = tdy - (cnt++);
    }
    document.querySelectorAll("#calen td").forEach(elem => {
        elem.addEventListener('mouseover', (e) => {
            if(!e.currentTarget.getElementsByTagName('div').length) return;
            if(!e.currentTarget.childNodes[0].dataset.date) return;
            let dt = getDateByTotal(e.currentTarget.childNodes[0].dataset.date);
            let str = "<font>" + dt[0] + "년 " + dt[1] + "월 " + dt[2] + "일</font><br>";
            let str2 = '';
            logs.forEach(elem => {
                if(elem[0] == e.currentTarget.childNodes[0].dataset.date) {
                    str2 += (elem[1].substring(11, 13)-0) + "시 " + (elem[1].substring(14, 16)-0) + "분<br>";
                }
            });
            if(str2.length) {
                logd.innerHTML = str + str2;
                logd.style.opacity = '1';
            }
            else logd.style.opacity = '0';
        });
    });
    document.getElementById('calen').addEventListener('mouseover', (e) => {
        logd.style.display = 'block';
    });
    document.getElementById('calen').addEventListener('mousemove', (e) => {
        if(innerWidth - e.clientX < logd.offsetWidth + 20) {
            logd.style.left = e.clientX - logd.offsetWidth - 10 + 'px';
        }
        else {
            logd.style.left = e.clientX + 10 + 'px';
        }
        if(innerHeight - e.clientY < logd.offsetHeight + 20) {
            logd.style.top = e.clientY - logd.offsetHeight - 10 + 'px';
        }
        else {
            logd.style.top = e.clientY + 10 + 'px';
        }
    });
    document.getElementById('calen').addEventListener('mouseout', (e) => {
        logd.style.display = 'none';
    });
});

