//Const cac thong so cai dat san

const noneEdit = 0;
const addingNode = 1;
const addingEdge = 2;
//Su kien nếu có 1 thành phần được click sẽ là true
var noneClick = false;
//do thi co huong hoac vo huong
var direction = false;
var editing = noneEdit;
//Lựa chọn đỉnh và cung
var selectNode;
var selectEdge;
var functionClickNode = () => { };
var functionClickEdge = () => { };

//The chua Graph
const container = document.getElementById('container_graph');

/*Lop gia edge de ve cung*/
var hoverEdge = document.createElement("div");
hoverEdge.setAttribute("class", "edge");
if (direction)
    hoverEdge.classList.add("direct");
container.appendChild(hoverEdge);
//Dinh nghia phuong thuc dac do dai edge
hoverEdge.setWidth = (node) => {
    let x1 = node.x;
    let x2 = (event.pageX - container.offsetLeft - 15);
    let y1 = node.y;
    let y2 = (event.pageY - container.offsetTop - 32);
    let w = Math.floor(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));

    hoverEdge.style.width = w + "px";
}
//Dinh nghia ham cap nhat vi tri x,y
hoverEdge.setXY = (node) => {
    let mx = (node.x + (event.pageX - container.offsetLeft - 15)) / 2;
    let my = (node.y + (event.pageY - container.offsetTop - 32)) / 2;
    mx = mx + 15 - (hoverEdge.offsetWidth / 2);
    my = my + 12;
    hoverEdge.style.top = my + "px";
    hoverEdge.style.left = mx + "px";
}
hoverEdge.classList.add('hiden');
//----------------

/*------------------------------------------*/
//Danh sach cac nut node
var nodes = [{
    id: "1",
    name: "1",
    x: 300,
    y: 300
}, {
    id: "2",
    name: "2",
    x: 100,
    y: 500
}, {
    id: "3",
    name: "3",
    x: 41,
    y: 100
}, {
    id: "4",
    name: "4",
    x: 400,
    y: 100
}, {
    id: "5",
    name: "5",
    x: 500,
    y: 400
}]
//Danh sach cac cung edge
var edges = [{
    id: "1",
    name: "1",
    start: nodes[0],
    end: nodes[1],
    value: 6
}, {
    id: "2",
    name: "2",
    start: nodes[0],
    end: nodes[2],
    value: 5
}, {
    id: "3",
    name: "3",
    start: nodes[3],
    end: nodes[2],
    value: 7
}, {
    id: "4",
    name: "4",
    start: nodes[0],
    end: nodes[3],
    value: 11
}, {
    id: "5",
    name: "5",
    start: nodes[1],
    end: nodes[4],
    value: 3
}, {
    id: "6",
    name: "6",
    start: nodes[3],
    end: nodes[4],
    value: 9
}, {
    id: "7",
    name: "7",
    start: nodes[1],
    end: nodes[2],
    value: 4
}]

//Danh sach node HTML
var divNodes = [];
var divEdges = [];

/**---------Thiet lap ve nodes va edges ---------------------------*/
//Xoay cung edge theo node
function rotateArrow(edge1) {
    let e1 = edge1.edge;
    //Lay vi tri cung
    let x = (edge1.offsetLeft) + (edge1.clientWidth / 2);
    let y = (edge1.offsetTop) + (edge1.clientHeight / 2);

    //Lay vi tri nut
    let n1X = e1.end.x + 15;
    let n1Y = e1.end.y + 15;

    let radian = Math.atan2(n1X - x, n1Y - y);
    //Xoay cung
    let rot = (radian * (180 / Math.PI) * -1) + 270;
    edge1.style.transform = "rotate(" + rot + "deg)";
}

//Tao su kien drag cho node
function dragElement(node) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    node.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        node.style.top = (node.offsetTop - pos2) + "px";
        node.style.left = (node.offsetLeft - pos1) + "px";
        node.node.y = node.offsetTop - pos2;
        node.node.x = node.offsetLeft - pos1;
        //Xoay cung
        divEdges.forEach((divEdge) => {
            if (divEdge.edge.start === node.node) {
                rotateArrow(divEdge);
                divEdge.setWidth(divEdge.edge);
                divEdge.setXY(divEdge.edge);
                divEdge.divValue.setXY(divEdge);
            }
            if (divEdge.edge.end === node.node) {
                rotateArrow(divEdge);
                divEdge.setWidth(divEdge.edge);
                divEdge.setXY(divEdge.edge);
                divEdge.divValue.setXY(divEdge);
            }
        })
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//Ve nut node ........................
function drawNode(node) {
    //Tao divNode
    let dNode = document.createElement("div");
    dNode.setAttribute("class", "node");
    container.appendChild(dNode);
    //Dinh nghia ham cap nhat vi tri x,y
    dNode.setXY = (x, y) => {
        dNode.style.top = y + "px";
        dNode.style.left = x + "px";
    }
    dNode.setXY(node.x, node.y);
    //////////////////////////////
    dNode.node = node;
    divNodes.push(dNode);
    dNode.addEventListener('click', () => {
        if (selectNode === dNode) {
            selectNode = undefined;
            dNode.classList.remove('pick');
        }
        else {
            selectNode = dNode;
            divNodes.forEach((node) => {
                node.classList.remove('pick');
            })
            dNode.classList.add('pick');
        }
        functionClickNode(dNode);
    })
    //Gan su kien cho node
    dragElement(dNode);

    //Them id vao divnode
    let idNode = document.createElement("DIV");
    idNode.classList.add('idnode');
    idNode.textContent = node.id;
    dNode.appendChild(idNode);
}
//Ve cung edge ................................
function drawEdge(edge) {
    //Tao divEdge
    let dEdge = document.createElement("div");
    dEdge.setAttribute("class", "edge");
    //Neu do thi co huong thi them huong
    if (direction)
        dEdge.classList.add("direct");
    container.appendChild(dEdge);
    //Dinh nghia phuong thuc dac do dai edge
    dEdge.setWidth = (e) => {
        let x1 = e.start.x;
        let x2 = e.end.x;
        let y1 = e.start.y;
        let y2 = e.end.y;
        let w = Math.floor(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));

        dEdge.style.width = w + "px";
    }
    //Dinh nghia ham cap nhat vi tri x,y
    dEdge.setXY = (e) => {
        let mx = (e.start.x + e.end.x) / 2;
        let my = (e.start.y + e.end.y) / 2;
        mx = mx + 15 - (dEdge.offsetWidth / 2);
        my = my + 12;
        dEdge.style.top = my + "px";
        dEdge.style.left = mx + "px";
    }
    //----------------
    dEdge.setWidth(edge);
    dEdge.setXY(edge);
    //Chen object edge vao div edge
    dEdge.edge = edge;
    //Xoay cung
    rotateArrow(dEdge);
    //Chen div edge vao danh sach cung
    divEdges.push(dEdge);
    //Tao gia tri cua cung edge
    let divValue = document.createElement("DIV");
    divValue.textContent = edge.value.toString();
    divValue.classList.add('edgevalue');
    divValue.setXY = (dEdge) => {
        let mx = (dEdge.edge.start.x + dEdge.edge.end.x) / 2;
        let my = (dEdge.edge.start.y + dEdge.edge.end.y) / 2;
        mx = mx;
        my = my;
        divValue.style.top = my + "px";
        divValue.style.left = mx + "px";
        if (divValue.divEdge.edge.start.x <= divValue.divEdge.edge.end.x) {
            divValue.style.transform = "translate(0px,24px)";
        } else {
            divValue.style.transform = "translate(0px,-12px)";
        }
    }
    divValue.divEdge = dEdge;
    dEdge.divValue = divValue;
    divValue.setXY(dEdge);
    //Chen value edge vao container
    container.appendChild(divValue);
    //Su kien cua edge
    dEdge.onmousedown = () => {
        //remove class của các cung khác nó
        divEdges.forEach((ed) => {
            ed.classList.remove('edgePick');
        })
        //add class cho cung được chọn
        dEdge.classList.add('edgePick');
        //Rán cung được chọn vào biến tạm
        selectEdge = dEdge;
        //Trạng thái nếu có 1 phần tử được chọn thì = true
        noneClick = true;
        //Function một chút viết sau
        functionClickEdge(dEdge);
    }
}

//Tao node cua html
nodes.forEach((node) => {
    drawNode(node);
})
//Tao edge cua html
edges.forEach((edge) => {
    drawEdge(edge);
})

//Tìm node trong nodes gán vào start end cho edge
function searchNodesForEdge(edge) {
    for (i = 0; i < nodes.length; i++) {
        if (edge.start.id == nodes[i].id) {
            edge.start = nodes[i];
            break;
        }
    }
    for (i = 0; i < nodes.length; i++) {
        if (edge.end.id == nodes[i].id) {
            edge.end = nodes[i];
            break;
        }
    }
}
///////////////////////////Controller//////////////////
/*---Button-----Event------*/

let addNodeBtn = document.getElementById('btn-addnode');
let removeNodeBtn = document.getElementById('btn-removenode');
let addEdgeBtn = document.getElementById('btn-addedge');
let valueInput = document.getElementById('in-value');
let kruskalBtn = document.getElementById('btn-kruskal');
let clearBtn = document.getElementById('btn-clear');
//Thêm 1 đỉnh
addNodeClick = () => {
    addEdgeBtn.classList.remove('btn-active');
    if (editing != addingNode) {
        addNodeBtn.classList.add('btn-active');
        editing = addingNode;
    }
    else {
        addNodeBtn.classList.remove('btn-active');
        editing = noneEdit;
    }
}
//Thêm 1 cung
addEdgeClick = () => {
    addEdgeBtn.classList.toggle('btn-active');
    addNodeBtn.classList.remove('btn-active');
    editing = addingEdge;
}
//Thay đổ value của cung
changInputValue = () => {
    if (selectEdge != undefined) {
        /*if (Number(valueInput.value) >= 0) {*/
            selectEdge.divValue.textContent = valueInput.value;
            selectEdge.edge.value = valueInput.value;
        /*} else {
            valueInput.value = 0;
            alert('Trọng số của cung phải là số nguyên không âm!');
        }*/
    }
    if (selectNode != undefined) {
        selectNode.node.id = valueInput.value;
        selectNode.node.name = valueInput.value;
        selectNode.firstElementChild.textContent = valueInput.value;
    }
}

//Ham xoa node va edges cua node do
deleteNode = () => {
    if (selectNode != undefined)
        for (let i = 0; i < divNodes.length; i++) {
            //Lặp mảng divNodes để tìm đỉnh cần xóa selectNode là biến tạm chứa đỉnh được chọn
            //Nếu bằng nhau thì bắt đầu xóa
            if (divNodes[i] === selectNode) {
                //Lặp để tìm trong mảng divEdges để xóa cung của node đó
                for (let j = 0; j < divEdges.length; j++) {
                    //Xoa cung cua node đó 
                    //Nếu cung đó có đỉnh bắt đầu và đỉnh kết thúc === node đó thì xóa
                    if (divEdges[j].edge.start === selectNode.node ||
                        divEdges[j].edge.end === selectNode.node) {
                        //Xóa trong thẻ cha
                        container.removeChild(divEdges[j].divValue);
                        container.removeChild(divEdges[j]);
                        //Xóa trong mảng
                        divEdges.splice(j, 1);
                        edges.splice(j, 1);
                        //Giảm chỉ số j lại để không bỏ sót
                        j--;
                    }
                }
                //Xoa node trong thẻ cha
                container.removeChild(divNodes[i]);
                //Xóa node trong mảng divNodes
                divNodes.splice(i, 1);
                //Xóa node trong mảng đối tượng nodes
                nodes.splice(i, 1);
                removeNodeBtn.classList.add('btn-noselect')
                //gán biến tạm bằng rỗng
                selectNode = undefined;
                return;
            }
        }
    else if (selectEdge != undefined) {
        for (let i = 0; i < divEdges.length; i++) {
            if (divEdges[i] === selectEdge) {
                //xóa thẻ edge trong thẻ cha
                container.removeChild(divEdges[i].divValue);
                container.removeChild(divEdges[i]);
                //xóa thẻ edge trong mảng
                divEdges.splice(i, 1);
                //xóa đối tượng edge trong mảng
                edges.splice(i, 1);
                //add class cho button xóa
                removeNodeBtn.classList.add('btn-noselect')
                //Gán biến tạm bằng rỗng
                selectEdge = undefined;
                return;
            }
        }
    }
}

//Override lai ham click cua node
functionClickNode = (divnode) => {
    if (!hoverEdge.classList.contains('hiden')) {
        let newEdge = {
            id: (edges.length + 1).toString(),
            name: (edges.length + 1).toString(),
            start: hoverEdge.start.node,
            end: divnode.node,
            value: 0
        }
        drawEdge(newEdge);
        edges.push(newEdge);

        container.onmousemove = undefined;
        hoverEdge.classList.add('hiden');
        editing = noneEdit;
    }
    if (editing === addingNode) {
        editing = noneEdit;
    } else {
        if (editing === addingEdge) {
            hoverEdge.classList.remove('hiden');
            hoverEdge.setWidth(divnode.node);
            hoverEdge.setXY(divnode.node);
            hoverEdge.start = divnode;

            divnode.classList.add('pick');

            container.onmousemove = (e) => {
                hoverEdge.setWidth(divnode.node);
                hoverEdge.setXY(divnode.node);
                //Lay vi tri cung
                let x = (hoverEdge.offsetLeft) + (hoverEdge.clientWidth / 2);
                let y = (hoverEdge.offsetTop) + (hoverEdge.clientHeight / 2);/** */

                //Lay vi tri nut
                let n1X = (e.pageX - container.offsetLeft);
                let n1Y = (e.pageY - container.offsetTop - 15);/*15*/

                let radian = Math.atan2(n1X - x, n1Y - y);
                //Xoay cung
                let rot = (radian * (180 / Math.PI) * -1) + 270;/* 270*/
                hoverEdge.style.transform = "rotate(" + rot + "deg)";

            }
        }
    }
    valueInput.value = divnode.node.id;
    addEdgeBtn.classList.remove('btn-active');
    addNodeBtn.classList.remove('btn-active');
    noneClick = true;
    if (selectNode === undefined && selectEdge === undefined) {
        removeNodeBtn.classList.add('btn-noselect');
    } else {
        removeNodeBtn.classList.remove('btn-noselect');
    }
    //Loai bo select edge
    divEdges.forEach((ed) => {
        ed.classList.remove('edgePick');
    })
    selectEdge = undefined;
}
//Override lai ham function click edge
functionClickEdge = (divedge) => {
    //Set giá trị của value input
    valueInput.value = divedge.divValue.textContent;
    //Nếu có 1 đỉnh được chọn và hoặc 1 cung được chọn thì button xóa thay đổi trạng thái
    if (selectNode === undefined && selectEdge === undefined) {
        removeNodeBtn.classList.add('btn-noselect');
    } else {
        removeNodeBtn.classList.remove('btn-noselect');
    }
    //Loai bo select node
    divNodes.forEach((node) => {
        node.classList.remove('pick');
    })
    selectNode = undefined;
}
//Clear container
functionClearContainer = () => {
    container.innerHTML = '';
    container.appendChild(hoverEdge);
    nodes = [];
    edges = [];
    divEdges = [];
    divNodes = [];
}

clearBtn.addEventListener('click', functionClearContainer);
addNodeBtn.addEventListener('click', addNodeClick);
addEdgeBtn.addEventListener('click', addEdgeClick);
removeNodeBtn.addEventListener('click', deleteNode);
valueInput.onchange = changInputValue;

var softEdge = document.getElementById('softedge');

/*-----------Them node vao container----------------*/
/*---------Thao tac tren container------------------*/
container.onclick = function (e) {
    if (noneClick) {
        noneClick = false;
        return;
    }
    if (editing === addingNode) {
        /*Tao nut moi*/
        e.preventDefault();
        let posX = e.pageX - this.offsetLeft - 15;
        let posY = e.pageY - this.offsetTop - 32;//32
        let idNode = (divNodes.length + 1).toString();
        let objectNode = {
            id: idNode,
            name: idNode,
            x: posX,
            y: posY
        }
        nodes.push(objectNode);
        drawNode(objectNode);
    } else {
        if (editing === addingEdge) {
            /*Khi hover vao container thi an lop gia divEdge*/
            if (!hoverEdge.classList.contains('hiden')) {
                container.onmousemove = undefined;
                hoverEdge.classList.add('hiden');
                editing = noneEdit;
            }
        }
    }
    if (selectNode != undefined) {
        removeNodeBtn.classList.add('btn-noselect');
        divNodes.forEach((node) => {
            node.classList.remove('pick');
        })
        selectNode = undefined;
    }
    if (selectEdge != undefined) {
        divEdges.forEach((ed) => {
            ed.classList.remove('edgePick');
        })
        selectEdge = undefined;
        removeNodeBtn.classList.add('btn-noselect');
    }
    if (softEdge.innerHTML != '') {
        softEdge.innerHTML = '';
        softEdge.classList.remove('softedge__show');
        let table = document.getElementById('table2excel');
        table.innerHTML = '<tr><th scope="col">Vị trí</th><th scope="col">Vị trí</th><th scope="col">Giá trị</th></tr>';
    }
}

/**................Duyet do thi danh sach cung kiem tra do thi lien thong.............*/

function neighbor(Graph, x) {
    let list = [];
    Graph.forEach(function (element) {
        if (nodes.indexOf(element.edge.start) == x)
            list.push(nodes.indexOf(element.edge.end));
        if (nodes.indexOf(element.edge.end) == x)
            list.push(nodes.indexOf(element.edge.start));
    });
    return list;
}

var mark = [];

function first_search(Graph, u) {
    if (mark[u] == 0) {
        mark[u] = 1;
        let list = neighbor(Graph, u);
        for (let i = 0; i < list.length; i++) {
            let x = list[i];
            first_search(Graph, x);
        }
    }
}

function lienthong(Graph) {
    mark.length = nodes.length;
    for (let i = 0; i < nodes.length; i++) {
        mark[i] = 0;
    }
    first_search(Graph, 0);
    for (let i = 0; i < mark.length; i++) {
        if (mark[i] == 0) {
            return false;
        }
    }
    return true;
}
/*...............................Cay khung toi tieu..............*/

/*Sap xep cung*/
function soft(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (Number(array[i].divValue.textContent) > Number(array[j].divValue.textContent)) {
                //swapEdge(array[i], array[j]);
                let sw = array[i];
                array[i] = array[j];
                array[j] = sw;
            }
        }
    }
}

var parent = [];
function find_root(u) {
    if (u === parent[nodes.indexOf(u)])
        return u;
    else
        return find_root(parent[nodes.indexOf(u)]);
}

function Kruskal(Graph) {
    let Tree = [];
    soft(Graph);
    let e;
    for (e = 0; e < divNodes.length; e++) {
        parent[e] = divNodes[e].node;
    }
    /**Kiem tra lien thong */
    if (!lienthong(Graph)) {
        alert('Đồ thị không liên thông. Vui lòng xem lại');
        return 0;
    }
    let sum = 0;
    e = 0;
    /**Them class cho soft */
    softEdge.classList.add('softedge__show')
    let i = 0;
    while (e < Graph.length && Tree.length < divNodes.length) {

        let u = Graph[e].edge.start;
        let v = Graph[e].edge.end;
        let w = Number(Graph[e].divValue.textContent);

        /**tao the softedge sắp xếp */
        let edgeSoftEle = document.createElement('div');
        edgeSoftEle.classList.add('softedge__element');
        edgeSoftEle.textContent = w;
        softEdge.appendChild(edgeSoftEle);

        let root_u = find_root(u);
        let root_v = find_root(v);

        if (root_u != root_v) {

            Tree.push(Graph[e]);
            sum += w;
            parent[nodes.indexOf(root_v)] = root_u;

            /**The softedge được chọn tô màu */
            setTimeout(function () {
                edgeSoftEle.classList.add('softedge__element--pick');
            }, 800 * (i + 1) + 2000);
            i++;
        }
        e++;
    }

    /**To mau ca cung theo ket qua tim duoc */
    for (let i = 0; i < Tree.length; i++) {
        setTimeout(function () {
            Tree[i].classList.add('edgePick');
        }, 800 * (i + 1) + 2000);
    }

    /**Hienn thi ket qua vao value */
    valueInput.value = sum;
    setTimeout(function () {
        valueInput.classList.add('inputValue--k');
        document.getElementById('inputKruskal').classList.add('inputKruskal--on');
    }, 800 * (i + 1) + 2000);
    setTimeout(function () {
        valueInput.classList.remove('inputValue--k');
        document.getElementById('inputKruskal').classList.remove('inputKruskal--on');
    }, 1000 * (i + 8) + 2000);
    return Tree;
}

var T = [];
/*Them su kien click de chay kruskal function*/
kruskalBtn.addEventListener('click', function () {
    /**Xoa mang hinh */
    if (softEdge.innerHTML != '') {
        softEdge.innerHTML = '';
        softEdge.classList.remove('softedge__show');
        let table = document.getElementById('table2excel');
        table.innerHTML = '<tr><th scope="col">Vị trí</th><th scope="col">Vị trí</th><th scope="col">Giá trị</th></tr>';
    }
    /**Chay Kruskal */ 
    T = Kruskal(divEdges);
    /**Xuat file Excel */
    let table = document.getElementById('table2excel');
    T.forEach(function (ele) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.textContent = ele.edge.start.id;
        td2.textContent = ele.edge.end.id;
        td3.textContent = ele.edge.value;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    });
});

/*----------Doc ghi file----------------------*/

/*Ghi file*/
var textFile = null,
    makeTextFile = function (text) {
        var data = new Blob([text], { type: 'text/plain' });
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        // returns a URL you can use as a href
        return textFile;
    };

//Nút ghi file
const create = document.getElementById('btn-file');
//Sự kiện nhấn ghi file
create.addEventListener('click', function () {
    //Chuỗi lưu đỉnh và cung
    let strFile = JSON.stringify(nodes) + '\n' + JSON.stringify(edges);

    let link = document.createElement('a');
    link.setAttribute('download', 'graphkrukal.txt');
    link.href = makeTextFile(strFile);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });

}, false);
/**------------------------------------------------------ */
/*Đọc file */

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
});

// Khởi tạo đối tượng FileReader
const reader = new FileReader();
// Lắng nghe trạng thái đăng tải tệp
fileSelector.addEventListener("change", (event) => {
    // Lấy thông tin tập tin được đăng tải
    var files = event.target.files;
    // Lắng nghe quá trình đọc tập tin hoàn thành
    reader.addEventListener("load", (event) => {
        let text = reader.result
        if (text !== '') {
            functionClearContainer();
            //Tạo cái mảng giữa những ký tự \n
            let arr = text.split('\n');
            //Gia ma
            nodes = JSON.parse(arr[0]);
            edges = JSON.parse(arr[1]);
            //Tao node cua html
            nodes.forEach((node) => {
                drawNode(node);
            })

            //Tao edge cua html
            edges.forEach((edge) => {
                searchNodesForEdge(edge);
                drawEdge(edge);
            })
        }
    });
    reader.onerror = (e) => {
        console.error(e)
    }
    reader.readAsText(files[0]);
})
/**------------------------------------------------------ */
/**Xuất file EXCEL */


