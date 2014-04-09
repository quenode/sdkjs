"use strict";

/* PopUpSelector.js
 *
 * Author: Alexander.Trofimov@avsmedia.net
 * Date:   April 7, 2014
 */
(	/**
 	 * @param {jQuery} $
 	 * @param {Window} window
 	 * @param {undefined} undefined
 	 */
	function($, window, undefined) {
		var asc		= window["Asc"];
		var asc_HL	= asc.HandlersList;

		function PopUpSelector(element, handlers) {
			this.handlers		= new asc_HL(handlers);

			this.element		= element;
			this.selector		= null;
			this.selectorStyle	= null;
			this.selectorList	= null;
			this.selectElement	= null;

			this.isFormula		= false;
			this.isVisible		= false;

			this.fMouseDown		= null;
			this.fMouseDblClick	= null;

			this._init();
			return this;
		}
		PopUpSelector.prototype._init = function () {
			var t = this;
			if (null != this.element) {
				this.selector = document.createElement("div");
				this.selectorStyle = this.selector.style;
				this.selector.id = "apiPopUpSelector";
				this.selector.innerHTML = '<div style="max-height:210px;overflow-y:auto"><ul id="apiPopUpList"></ul></div>';

				this.element.appendChild(this.selector);
				this.selectorList = document.getElementById("apiPopUpList");

				this.fMouseDown = function (event) {t._onMouseDown(event);};
				this.fMouseDblClick = function (event) {t._onMouseDblClick(event);};
			}
		};
		PopUpSelector.prototype.show = function (isFormula, arrItems, cellRect) {
			this._clearList();
			this.setPosition(cellRect);
			if (!this.isVisible) {
				this.selectorStyle.display = "block";
				this.isVisible = true;
			}
			this.isFormula = isFormula;

			var item;
			for (var i = 0; i < arrItems.length; ++i) {
				item = document.createElement("li");
				if (this.isFormula) {
					if (0 === i) {
						this.selectElement = item;
						item.className = "selected";
					}
					item.innerHTML = arrItems[i].name;
					item.setAttribute("title", arrItems[i].arg);
				} else
					item.innerHTML = arrItems[i];

				if (item.addEventListener) {
					item.addEventListener("mousedown"	, this.fMouseDown		, false);
					item.addEventListener("dblclick"	, this.fMouseDblClick	, false);
				}

				this.selectorList.appendChild(item);
			}

			// Selection hack
			/*var clearSelection = function() {
				if (document.selection && document.selection.empty) {
					document.selection.empty();
				}
				else if (window.getSelection) {
					var sel = window.getSelection();
					sel.removeAllRanges();
				}
			}*/
			// TODO: В Mozilla избавиться от селекта текста при dblclick
		};
		PopUpSelector.prototype.hide = function () {
			if (this.isVisible) {
				this.selectorStyle.display = "none";
				this.isVisible = false;
			}
			this._clearList();
		};
		PopUpSelector.prototype.setPosition = function (cellRect) {
			this.selectorStyle["left"] = (cellRect.asc_getX() + 10) + "px";
			this.selectorStyle["top"] = (cellRect.asc_getY() + cellRect.asc_getHeight()) + "px";
		};
		PopUpSelector.prototype.getVisible = function () {
			return this.isVisible;
		};
		PopUpSelector.prototype._clearList = function () {
			this.selectorList.innerHTML = "";
			this.selectElement = null;
			this.isFormula = false;
		};

		PopUpSelector.prototype.onKeyDown = function (event) {
			var retVal = false;
			switch (event.which) {
				case 9: // Tab
					break;
				case 13:  // "enter"
					break;
				case 27: // Esc
					this.hide();
					break;
				case 38: // Up
					if (this.isFormula)
						this._onChangeSelection(this.selectElement.previousSibling);
					break;
				case 40: // Down
					if (this.isFormula)
						this._onChangeSelection(this.selectElement.nextSibling);
					break;
				default:
					retVal = true;
			}
			return retVal;
		};

		PopUpSelector.prototype._onMouseDown = function (event) {
			var element = (event.target || event.srcElement);
			if (this.isFormula) {
				this._onChangeSelection(element);
			} else {
				this.hide();
				this.handlers.trigger("insert", element.innerHTML);
			}
		};
		PopUpSelector.prototype._onMouseDblClick = function (event) {
			if (!this.isVisible)
				return;

			if (!this.isFormula) {
				this._onMouseDown(event);
				return;
			}
			var elementVal = (event.target || event.srcElement).innerHTML + "(";
			this.hide();
			this.handlers.trigger("insert", elementVal);
		};
		PopUpSelector.prototype._onChangeSelection = function (newElement) {
			if (null === newElement)
				return;

			if (null !== this.selectElement)
				this.selectElement.className = "";

			this.selectElement = newElement;
			this.selectElement.className = "selected";
		};

		/*
		 * Export
		 * -----------------------------------------------------------------------------
		 */
		window["Asc"].PopUpSelector = PopUpSelector;
	}
)(jQuery, window);
