//INHERITED
var sideNavExpand = $("#sidenav-expand");
var designerContainer = $("#designer-container");
var subscribeDialog = $("#subscribe-dialog");

function openSideNav() {
    sideNavExpand.removeClass("sidenav-hidden");
    sideNavExpand.addClass("sidenav-show");
    designerContainer.css("margin-left", "410px");
}
function closeSideNav() {
    sideNavExpand.addClass("sidenav-hidden");
    sideNavExpand.removeClass("sidenav-show");
    designerContainer.css("margin-left", "90px");
}
function subscribe() {
    var firstNameValue = document.getElementById("firstName").value;
    var lastNameValue = document.getElementById("lastName").value;
    var emailValue = document.getElementById("email").value;
    var subscribeValue = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue
    };
    var formValidation = !Object.keys(subscribeValue).some(key => !subscribeValue[key]);
    if (formValidation) {
        console.log(subscribeValue); // do something with data
        localStorage.setItem('subscribed', 'true');
        closeSubscribeDialog();
    } else {
        // throw error
    }
}
function closeSubscribeDialog() {
    var isSubscribed = localStorage.getItem('subscribed');
    if (isSubscribed !== 'true') {
        localStorage.setItem('subscribed', 'true');
    }
    $(subscribeDialog).css("display", "none");
}
(function showDialog() {
    var isSubscribed = localStorage.getItem('subscribed');
    if (isSubscribed === 'true') {
        $(subscribeDialog).css("display", "none");
    } else {
        $(subscribeDialog).css("display", "flex");
    }
})()

//ADDED
var _BASEURL = "http://116.203.179.177/fcapi/api/";
var _TOKEN = null;
var _STAGE = null;
var _LAYER = null;
var _ZOOM = null;
function changeZoom() {
    //Width, height
    var width = _ZOOM * (_STAGE.width() / 100);
    var height = _ZOOM * (_STAGE.height() / 100);
    $("#parentcontainer").width(width + 5).height(height + 5);
    $("#container").width(width).height(height);
    //Padding
    $(".container").css("padding-left", "0px");
    $(".container").css("padding-right", "0px");
    $(".container").css("padding-top", "0px");
    $(".container").css("padding-bottom", "0px");
    $("#designer-container").css("padding-left", "0px");
    $("#designer-container").css("padding-right", "0px");
    $("#designer-container").css("padding-top", "0px");
    $("#designer-container").css("padding-bottom", "0px");
    $("#designer-0").css("padding-left", "0px");
    $("#designer-0").css("padding-right", "0px");
    $("#designer-0").css("padding-top", "0px");
    $("#designer-0").css("padding-bottom", "0px");
    _STAGE.scaleX(_ZOOM / 100);
    _STAGE.scaleY(_ZOOM / 100);
    _STAGE.draw();
}
function createStage(page) {
    //Stage
    _STAGE = Konva.Node.create(page.Content, "container");
    if (_STAGE.find("Layer").toArray().length == 0) {
        _LAYER = new Konva.Layer();
        _STAGE.add(_LAYER);
    }
    else {
        _LAYER = _STAGE.find("Layer").toArray()[0];
    }
    //Arrow
    _STAGE.find("Arrow").forEach(function (arrow) {
        configureArrow(arrow);
    });
    //Circle
    _STAGE.find("Circle").forEach(function (circle) {
        configureCircle(circle);
    });
    //Ellipse
    _STAGE.find("Ellipse").forEach(function (ellipse) {
        configureEllipse(ellipse);
    });
    //Image
    _STAGE.find("Image").forEach(function (image) {
        configureImage(image);
        var imageObject = new Image();
        imageObject.onload = function () {
            image.image(imageObject);
            _STAGE.draw();
        };
        imageObject.src = image.id().split('_')[1];
    });
    //Line
    _STAGE.find("Line").forEach(function (line) {
        configureLine(line);
    });
    //Rect
    _STAGE.find("Rect").forEach(function (rect) {
        configureRect(rect);
    });
    //RegularPolygon
    _STAGE.find("RegularPolygon").forEach(function (regularPolygon) {
        configureRegularPolygon(regularPolygon);
    });
    //Text
    _STAGE.find("Text").forEach(function (text) {
        configureText(text);
    });
    //Wedge
    _STAGE.find("Wedge").forEach(function (wedge) {
        configureWedge(wedge);
    });
    //Zoom
    changeZoom();
    //Keydown
    var container = _STAGE.container();
    container.tabIndex = 1;
    container.focus();
    $("#container").css("outline", "none");
    var DELTA = 1;
    container.addEventListener('keydown', function (e) {
        var shape = null;
        _STAGE.find("Transformer").forEach(function (transformer) {
            var shapeId = transformer.id().replace("Transformer-", "");
            _STAGE.find("Arrow").forEach(function (arrow) {
                if (arrow.id() == shapeId) {
                    shape = arrow;
                }
            });
            _STAGE.find("Circle").forEach(function (circle) {
                if (circle.id() == shapeId) {
                    shape = circle;
                }
            });
            _STAGE.find("Ellipse").forEach(function (ellipse) {
                if (ellipse.id() == shapeId) {
                    shape = ellipse;
                }
            });
            _STAGE.find("Image").forEach(function (image) {
                if (image.id() == shapeId) {
                    shape = image;
                }
            });
            _STAGE.find("Line").forEach(function (line) {
                if (line.id() == shapeId) {
                    shape = line;
                }
            });
            _STAGE.find("Rect").forEach(function (rect) {
                if (rect.id() == shapeId) {
                    shape = rect;
                }
            });
            _STAGE.find("RegularPolygon").forEach(function (regularPolygon) {
                if (regularPolygon.id() == shapeId) {
                    shape = regularPolygon;
                }
            });
            _STAGE.find("Text").forEach(function (text) {
                if (text.id() == shapeId) {
                    shape = text;
                }
            });
            _STAGE.find("Wedge").forEach(function (wedge) {
                if (wedge.id() == shapeId) {
                    shape = wedge;
                }
            });
        });
        if (e.keyCode === 37) {
            if (shape != null) {
                shape.x(shape.x() - DELTA);
            }
        }
        else if (e.keyCode === 38) {
            if (shape != null) {
                shape.y(shape.y() - DELTA);
            }
        }
        else if (e.keyCode === 39) {
            if (shape != null) {
                shape.x(shape.x() + DELTA);
            }
        }
        else if (e.keyCode === 40) {
            if (shape != null) {
                shape.y(shape.y() + DELTA);
            }
        }
        else {
            return;
        }
        e.preventDefault();
        _STAGE.draw();
    });
    //Disable right click
    _STAGE.on('contextmenu', function (e) {
        // prevent default behavior
        e.evt.preventDefault();
        if (e.target === _STAGE) {
            // if we are on empty place of the stage we will do nothing
            return;
        }
    });
}
function initializeStage() {
    $(".presentation-title").text("");
    $(".presentation-title-slide").text("");
    createStage({
        Width: 1282,
        Height: 721,
        Content: '{  "attrs": {    "width": "1282",    "height": "721"  },  "className": "Stage",  "children": [    {      "attrs": {              },      "className": "Layer",      "children": [        {          "attrs": {            "id": "Rect3c605d24-8b3b-43c4-80ae-b95e0e1201ec",            "width": 1282,            "height": 721,            "fill": "white",            "stroke": "white",            "strokeWidth": 1,            "draggable": true          },          "className": "Rect"        },        {          "attrs": {            "fill": "#000000",            "id": "Text002a17af-d840-4668-9ff5-392089376095",            "x": 185.9999999999999,            "y": 219.99999999999997,            "width": 883.9999999999998,            "text": "SLIDESnow is a design platform with strategy, analyses, operations and business presentation templates, from FIRMSconsulting.com and StrategyTraining.com, that can be fully modified by users.",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "scaleY": 0.9999999999999919,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#10A1FF",            "id": "Text52b649db-aec5-442b-b7c6-d376713e83bf",            "x": 184.99999999999966,            "y": 367.9999999999992,            "width": 107.00000000000034,            "text": "Step 1:",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true,            "scaleY": 0.9999999999999987          },          "className": "Text"        },        {          "attrs": {            "fill": "#000000",            "id": "Textfe1ebaa7-34fe-4248-bade-bf7f03bd5412",            "x": 283.9999999999997,            "y": 366.99999999999903,            "width": 768.3333333333331,            "text": "Select a template on the left.",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "scaleY": 0.999999999999998          },          "className": "Text"        },        {          "attrs": {            "fill": "#10A1FF",            "id": "Text918010c6-8e91-424e-85e7-06dc90aa2cdf",            "x": 184.99999999999966,            "y": 410.9999999999992,            "width": 107.00000000000034,            "text": "Step 2:",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#10A1FF",            "id": "Textfab8aa2f-a2a5-4059-ae5d-fd99faf6f957",            "x": 184.99999999999966,            "y": 453.9999999999992,            "width": 107.00000000000034,            "text": "Step 3:",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#10A1FF",            "id": "Texted033f75-430f-4dd6-9c23-c0404b97dd69",            "x": 184.99999999999966,            "y": 497.9999999999992,            "width": 107.00000000000034,            "text": "Step 4:",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#000000",            "id": "Text50cea5d3-8b10-4962-b0b4-a9296b222167",            "x": 283.9999999999997,            "y": 409.99999999999903,            "width": 768.3333333333331,            "text": "Click on a slide.",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#000000",            "id": "Text4f9b3153-f091-4522-8209-7569f24bfaf9",            "x": 283.9999999999997,            "y": 452.99999999999903,            "width": 768.3333333333331,            "text": "Edit the text.",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        },        {          "attrs": {            "fill": "#000000",            "id": "Textdb2329d9-622d-4ae3-b309-e0804309a4c7",            "x": 283.9999999999997,            "y": 496.9999999999991,            "width": 768.3333333333331,            "text": "Save and download completed slides.",            "fontSize": 30,            "fontFamily": "Roboto",            "draggable": true,            "visible": true          },          "className": "Text"        }      ]    }  ]}'
    });
}
function getTemplates(keyword) {
    initializeStage();
    var url = _BASEURL + "slidesnow/template?allrows=true&orderby=Order";
    var where = "Code.Contains(\"" + keyword + "\") OR Name.Contains(\"" + keyword + "\") OR Description.Contains(\"" + keyword + "\")";
    url += "&Where=" + where;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _TOKEN);
        },
        success: function (data, textStatus, jQxhr) {
            $("#search-term").focus();
            $('#template-menu').empty();
            var html = "";
            $.each(data.List, function (index, value) {
                html += '<div id="template-' + value.Id + '" class="template-item" onclick="getPages(this);">';
                html += '<p class="template-item-title">' + value.Code + ' > ' + value.Name + ' > ' + value.Description + '</p>';
                html += '<img src="' + value.CoverUrl + '" alt="template-img" class="template-item-img">';
                html += '</div>';
            });
            $('#template-menu').append(html);
            var smallNavigationHtml = '';
            smallNavigationHtml += '<div class="small-navigation">';
            smallNavigationHtml += '<a onclick="getAllTemplates();">Templates</a>';
            smallNavigationHtml += '</div>';
            $(".small-navigation").remove();
            if (!$("#sidenav-expand").find(".small-navigation").length) {
                $(".search").after(smallNavigationHtml);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
function getAllTemplates() {
    $('#search-term').val("");
    initializeStage();
    $.ajax({
        url: _BASEURL + "slidesnow/template?allrows=true&orderby=Order",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _TOKEN);
        },
        success: function (data, textStatus, jQxhr) {
            $('#template-menu').empty();
            var html = "";
            $.each(data.List, function (index, value) {
                html += '<div id="template-' + value.Id + '" class="template-item" onclick="getPages(this);">';
                html += '<p class="template-item-title">' + value.Code + ' > ' + value.Name + ' > ' + value.Description + '</p>';
                html += '<img src="' + value.CoverUrl + '" alt="template-img" class="template-item-img">';
                html += '</div>';
            });
            $('#template-menu').append(html);
            var smallNavigationHtml = '';
            smallNavigationHtml += '<div class="small-navigation">';
            smallNavigationHtml += '<a onclick="getAllTemplates();">Templates</a>';
            smallNavigationHtml += '</div>';
            $(".small-navigation").remove();
            if (!$("#sidenav-expand").find(".small-navigation").length) {
                $(".search").after(smallNavigationHtml);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
function getPages(element) {
    initializeStage();
    var id = $(element).prop("id");
    if (id.startsWith("template")) {
        var url = _BASEURL + "slidesnow/page?allrows=true&orderby=Order&Fields=Id&Fields=Name&Fields=CoverUrl&Fields=TemplateText";
        var where = "TemplateId=" + id.split('-')[1];
        url += "&Where=" + where;
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + _TOKEN);
            },
            success: function (data, textStatus, jQxhr) {
                $('#template-menu').empty();
                var html = "";
                $.each(data.List, function (index, value) {
                    html += '<div id="page-' + value.Id + '" class="template-item" onclick="getPages(this);">';
                    html += '<p class="template-item-title">' + value.TemplateText + ' > ' + value.Name + '</p>';
                    html += '<img src="' + value.CoverUrl + '" alt="template-img" class="template-item-img">';
                    html += '</div>';
                });
                $('#template-menu').append(html);
                var smallNavigationHtml = '';
                smallNavigationHtml += '<div class="small-navigation">';
                smallNavigationHtml += '<a onclick="getAllTemplates();">Templates</a>';
                smallNavigationHtml += '<span>/</span>';
                smallNavigationHtml += '<a>Slides</a>';
                smallNavigationHtml += '</div>';
                $(".small-navigation").remove();
                if (!$("#sidenav-expand").find(".small-navigation").length) {
                    $(".search").after(smallNavigationHtml);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
    else if (id.startsWith("page")) {
        var url = _BASEURL + "slidesnow/page/" + id.split('-')[1];
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + _TOKEN);
            },
            success: function (data, textStatus, jQxhr) {
                if (data.TemplateText.length > 0) {
                    var array = data.TemplateText.split(' > ');
                    $(".presentation-title").text(array[0] + ' - ' + array[1]);
                    $(".presentation-title-slide").text(array[2] + ' - ' + data.Name);
                }
                else {
                    $(".presentation-title").text("");
                    $(".presentation-title-slide").text(data.Name);
                }
                createStage(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
function configureArrow(arrow) {
    arrow.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + arrow.id());
        transformer.nodes([arrow]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
}
function configureCircle(circle) {
    circle.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + circle.id());
        transformer.nodes([circle]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    circle.on('transform', function () {
        circle.width(circle.width() * circle.scaleX());
        circle.scaleX(1);
        circle.height(circle.height() * circle.scaleY());
        circle.scaleY(1);
    });
}
function configureEllipse(ellipse) {
    ellipse.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + ellipse.id());
        transformer.nodes([ellipse]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    ellipse.on('transform', function () {
        ellipse.width(ellipse.width() * ellipse.scaleX());
        ellipse.scaleX(1);
        ellipse.height(ellipse.height() * ellipse.scaleY());
        ellipse.scaleY(1);
    });
}
function configureImage(image) {
    image.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + image.id());
        transformer.nodes([image]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    image.on('transform', function () {
        image.width(image.width() * image.scaleX());
        image.scaleX(1);
        image.height(image.height() * image.scaleY());
        image.scaleY(1);
    });
}
function configureLine(line) {
    line.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + line.id());
        transformer.nodes([line]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
}
function configureRect(rect) {
    rect.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + rect.id());
        transformer.nodes([rect]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    rect.on('transform', function () {
        rect.width(rect.width() * rect.scaleX());
        rect.scaleX(1);
        rect.height(rect.height() * rect.scaleY());
        rect.scaleY(1);
    });
}
function configureRegularPolygon(regularPolygon) {
    regularPolygon.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + regularPolygon.id());
        transformer.nodes([regularPolygon]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    regularPolygon.on('transform', function () {
        regularPolygon.width(regularPolygon.width() * regularPolygon.scaleX());
        regularPolygon.scaleX(1);
        regularPolygon.height(regularPolygon.height() * regularPolygon.scaleY());
        regularPolygon.scaleY(1);
    });
}
function configureText(text) {
    text.on("click", () => {
        //Transformer
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + text.id());
        transformer.nodes([text]);
        transformer.enabledAnchors(['middle-left', 'middle-right']);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
    text.on('transform', function () {
        text.setAttrs({
            width: text.width() * text.scaleX(),
            scaleX: 1
        });
    });
    text.on("dblclick", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        text.hide();
        _STAGE.draw();
        var textPosition = text.absolutePosition();
        var stageBox = _STAGE.container().getBoundingClientRect();
        var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        };
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = text.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = text.width() - text.padding() * 2 + 'px';
        textarea.style.height = text.height() - text.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = text.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = text.lineHeight();
        textarea.style.fontFamily = text.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = text.align();
        textarea.style.color = text.fill();
        rotation = text.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }
        var px = 0;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(text.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';
        textarea.style.transform = transform;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 3 + 'px';
        textarea.focus();
        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            text.show();
            _STAGE.draw();
        }
        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                newWidth = text.placeholder.length * text.fontSize();
            }
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }
            var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }
        textarea.addEventListener('keydown', function (e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                text.text(textarea.value);
                removeTextarea();
            }
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });
        textarea.addEventListener('keydown', function (e) {
            scale = text.getAbsoluteScale().x;
            setTextareaWidth(text.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + text.fontSize() + 'px';
        });
        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                text.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });
}
function configureWedge(wedge) {
    wedge.on("click", () => {
        _STAGE.find("Transformer").forEach(function (transformer) {
            transformer.destroy();
        });
        var transformer = new Konva.Transformer();
        transformer.id("Transformer-" + wedge.id());
        transformer.nodes([wedge]);
        _LAYER.add(transformer);
        _STAGE.draw();
    });
}
function downloadPng() {
    _STAGE.find("Transformer").forEach(function (transformer) {
        transformer.destroy();
    });
    _STAGE.draw();
    var stageClone = _STAGE.clone();
    stageClone.scaleX(1);
    stageClone.scaleY(1);
    var dataURL = stageClone.toDataURL({ pixelRatio: 1 });
    stageClone.destroy();
    var link = document.createElement('a');
    link.download = "canvas.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
function downloadPdf() {
    _STAGE.find("Transformer").forEach(function (transformer) {
        transformer.destroy();
    });
    _STAGE.draw();
    var stageClone = _STAGE.clone();
    stageClone.scaleX(1);
    stageClone.scaleY(1);
    var dataURL = stageClone.toDataURL({ pixelRatio: 1 });
    var format = "l";
    if (stageClone.width() <= stageClone.height()) {
        format = "p";
    }
    var pdf = new jsPDF(format, "px", [stageClone.width(), stageClone.height()]);
    pdf.addImage(dataURL, 0, 0, stageClone.width(), stageClone.height());
    stageClone.destroy();
    pdf.save('canvas.pdf');
}
$(document).ready(function () {
    $.ajax({
        url: _BASEURL + "authentication/authentication/login",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ AuthenticationScheme: "Bearer", Username: "public", Password: "public", OperatingSystem: "N/A", Client: "Designer", Expiration: 1440 }),
        success: function (data, textStatus, jQxhr) {
            //Token
            _TOKEN = data.Token;
            //Zoom
            _ZOOM = parseInt($(".select-selected").html().substring(0, $(".select-selected").html().length - 1));
            //Zoom change event
            $(".select-items").click(function () {
                _ZOOM = parseInt($(".select-selected").html().substring(0, $(".select-selected").html().length - 1));
                changeZoom();
            });
            //Templates
            getAllTemplates();
            //Search templates event
            let timeout;
            $('#search-term').on('input', function () {
                var keyword = $('#search-term').val();
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    getTemplates(keyword);
                }, 500)
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
});
