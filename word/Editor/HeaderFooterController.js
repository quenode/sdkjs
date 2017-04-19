"use strict";
/**
 * User: Ilja.Kirillov
 * Date: 10.06.2016
 * Time: 15:33
 */


// TODO: На самом деле этот класс не нужен. Его нужно совместить с классом CHeaderFooterController, пока он будет сделан
// как оберточный класс над CHeaderFooterController

/**
 * Специальный класс-обработчик команд в колонтитулах
 * @param {CDocument} LogicDocument - Ссылка на главный документ.
 * @param {CHeaderFooterController} HdrFtr - ССылка на объект, управляющий колонтитулами
 * @constructor
 * @extends {CDocumentControllerBase}
 */
function CHdrFtrController(LogicDocument, HdrFtr)
{
	CDocumentControllerBase.call(this, LogicDocument);
	this.HdrFtr = HdrFtr;
}
CHdrFtrController.prototype = Object.create(CDocumentControllerBase.prototype);
CHdrFtrController.prototype.constructor = CHdrFtrController;

CHdrFtrController.prototype.CanUpdateTarget = function()
{
	return true;
};
CHdrFtrController.prototype.RecalculateCurPos = function()
{
	return this.HdrFtr.RecalculateCurPos();
};
CHdrFtrController.prototype.GetCurPage = function()
{
	var CurHdrFtr = this.HdrFtr.CurHdrFtr;
	if (null !== CurHdrFtr && -1 !== CurHdrFtr.RecalcInfo.CurPage)
		return CurHdrFtr.RecalcInfo.CurPage;

	return -1;
};
CHdrFtrController.prototype.AddNewParagraph = function(bRecalculate, bForceAdd)
{
	return this.HdrFtr.Add_NewParagraph(bRecalculate, bForceAdd);
};
CHdrFtrController.prototype.AddInlineImage = function(nW, nH, oImage, oChart, bFlow)
{
	this.HdrFtr.AddInlineImage(nW, nH, oImage, oChart, bFlow);
};
CHdrFtrController.prototype.AddOleObject = function(W, H, nWidthPix, nHeightPix, Img, Data, sApplicationId)
{
	this.HdrFtr.AddOleObject(W, H, nWidthPix, nHeightPix, Img, Data, sApplicationId);
};
CHdrFtrController.prototype.AddTextArt = function(nStyle)
{
	this.HdrFtr.AddTextArt(nStyle);
};
CHdrFtrController.prototype.EditChart = function(Chart)
{
	this.HdrFtr.EditChart(Chart);
};
CHdrFtrController.prototype.AddInlineTable = function(Cols, Rows)
{
	this.HdrFtr.AddInlineTable(Cols, Rows);
};
CHdrFtrController.prototype.ClearParagraphFormatting = function()
{
	this.HdrFtr.ClearParagraphFormatting();
};
CHdrFtrController.prototype.AddToParagraph = function(oItem, bRecalculate)
{
	if (para_NewLine === oItem.Type && true === oItem.IsPageOrColumnBreak())
		return;

	this.HdrFtr.Paragraph_Add(oItem, bRecalculate);
	this.LogicDocument.Document_UpdateSelectionState();
	this.LogicDocument.Document_UpdateUndoRedoState();
};
CHdrFtrController.prototype.Remove = function(Count, bOnlyText, bRemoveOnlySelection, bOnTextAdd)
{
	var nResult = this.HdrFtr.Remove(Count, bOnlyText, bRemoveOnlySelection, bOnTextAdd);

	if (null !== this.HdrFtr.CurHdtr && docpostype_DrawingObjects !== this.HdrFtr.CurHdrFtr.Content.CurPos.Type)
	{
		this.LogicDocument.RemoveSelection();
		this.LogicDocument.Selection.Use = false;
	}

	return nResult;
};
CHdrFtrController.prototype.GetCursorPosXY = function()
{
	return this.HdrFtr.GetCursorPosXY();
};
CHdrFtrController.prototype.MoveCursorToStartPos = function(AddToSelect)
{
	this.HdrFtr.MoveCursorToStartPos(AddToSelect);
};
CHdrFtrController.prototype.MoveCursorToEndPos = function(AddToSelect)
{
	this.HdrFtr.MoveCursorToEndPos(AddToSelect);
};
CHdrFtrController.prototype.MoveCursorLeft = function(AddToSelect, Word)
{
	return this.HdrFtr.MoveCursorLeft(AddToSelect, Word);
};
CHdrFtrController.prototype.MoveCursorRight = function(AddToSelect, Word, FromPaste)
{
	return this.HdrFtr.MoveCursorRight(AddToSelect, Word, FromPaste);
};
CHdrFtrController.prototype.MoveCursorUp = function(AddToSelect)
{
	var RetValue = this.HdrFtr.MoveCursorUp(AddToSelect);
	this.LogicDocument.Document_UpdateInterfaceState();
	this.LogicDocument.Document_UpdateSelectionState();
	return RetValue;
};
CHdrFtrController.prototype.MoveCursorDown = function(AddToSelect)
{
	var RetValue = this.HdrFtr.MoveCursorDown(AddToSelect);
	this.LogicDocument.Document_UpdateInterfaceState();
	this.LogicDocument.Document_UpdateSelectionState();
	return RetValue;
};
CHdrFtrController.prototype.MoveCursorToEndOfLine = function(AddToSelect)
{
	return this.HdrFtr.MoveCursorToEndOfLine(AddToSelect);
};
CHdrFtrController.prototype.MoveCursorToStartOfLine = function(AddToSelect)
{
	return this.HdrFtr.MoveCursorToStartOfLine(AddToSelect);
};
CHdrFtrController.prototype.MoveCursorToXY = function(X, Y, PageAbs, AddToSelect)
{
	return this.HdrFtr.MoveCursorToXY(X, Y, PageAbs, AddToSelect);
};
CHdrFtrController.prototype.MoveCursorToCell = function(bNext)
{
	return this.HdrFtr.MoveCursorToCell(bNext);
};
CHdrFtrController.prototype.SetParagraphAlign = function(Align)
{
	this.HdrFtr.SetParagraphAlign(Align);
};
CHdrFtrController.prototype.SetParagraphSpacing = function (Spacing)
{
	this.HdrFtr.SetParagraphSpacing(Spacing);
};
CHdrFtrController.prototype.SetParagraphTabs = function(Tabs)
{
	this.HdrFtr.SetParagraphTabs(Tabs);
};
CHdrFtrController.prototype.SetParagraphIndent = function(Ind)
{
	this.HdrFtr.SetParagraphIndent(Ind);
};
CHdrFtrController.prototype.SetParagraphNumbering = function(NumInfo)
{
	this.HdrFtr.SetParagraphNumbering(NumInfo);
};
CHdrFtrController.prototype.SetParagraphShd = function(Shd)
{
	this.HdrFtr.SetParagraphShd(Shd);
};
CHdrFtrController.prototype.SetParagraphStyle = function(Name)
{
	this.HdrFtr.SetParagraphStyle(Name);
};
CHdrFtrController.prototype.SetParagraphContextualSpacing = function(Value)
{
	this.HdrFtr.SetParagraphContextualSpacing(Value);
};
CHdrFtrController.prototype.SetParagraphPageBreakBefore = function(Value)
{
	this.HdrFtr.SetParagraphPageBreakBefore(Value);
};
CHdrFtrController.prototype.SetParagraphKeepLines = function(Value)
{
	this.HdrFtr.SetParagraphKeepLines(Value);
};
CHdrFtrController.prototype.SetParagraphKeepNext = function(Value)
{
	this.HdrFtr.SetParagraphKeepNext(Value);
};
CHdrFtrController.prototype.SetParagraphWidowControl = function(Value)
{
	this.HdrFtr.SetParagraphWidowControl(Value);
};
CHdrFtrController.prototype.SetParagraphBorders = function(Borders)
{
	this.HdrFtr.SetParagraphBorders(Borders);
};
CHdrFtrController.prototype.SetParagraphFramePr = function(FramePr, bDelete)
{
	this.HdrFtr.SetParagraphFramePr(FramePr, bDelete);
};
CHdrFtrController.prototype.IncreaseDecreaseFontSize = function(bIncrease)
{
	this.HdrFtr.IncreaseDecreaseFontSize(bIncrease);
};
CHdrFtrController.prototype.IncreaseDecreaseIndent = function(bIncrease)
{
	this.HdrFtr.IncreaseDecreaseIndent(bIncrease);
};
CHdrFtrController.prototype.SetImageProps = function(Props)
{
	this.HdrFtr.SetImageProps(Props);
};
CHdrFtrController.prototype.SetTableProps = function(Props)
{
	this.HdrFtr.SetTableProps(Props);
};
CHdrFtrController.prototype.GetCalculatedParaPr = function()
{
	return this.HdrFtr.GetCalculatedParaPr();
};
CHdrFtrController.prototype.GetCalculatedTextPr = function()
{
	return this.HdrFtr.GetCalculatedTextPr();
};
CHdrFtrController.prototype.GetDirectParaPr = function()
{
	return this.HdrFtr.GetDirectParaPr();
};
CHdrFtrController.prototype.GetDirectTextPr = function()
{
	return this.HdrFtr.GetDirectTextPr();
};
CHdrFtrController.prototype.RemoveSelection = function(bNoCheckDrawing)
{
	this.HdrFtr.RemoveSelection(bNoCheckDrawing);
};
CHdrFtrController.prototype.IsEmptySelection = function(bCheckHidden)
{
	return this.HdrFtr.Selection_IsEmpty(bCheckHidden);
};
CHdrFtrController.prototype.DrawSelectionOnPage = function(PageAbs)
{
	this.HdrFtr.Selection_Draw_Page(PageAbs);
};
CHdrFtrController.prototype.GetSelectionBounds = function()
{
	return this.HdrFtr.Get_SelectionBounds();
};
CHdrFtrController.prototype.IsMovingTableBorder = function()
{
	return this.HdrFtr.IsMovingTableBorder();
};
CHdrFtrController.prototype.CheckPosInSelection = function(X, Y, PageAbs, NearPos)
{
	return this.HdrFtr.Selection_Check(X, Y, PageAbs, NearPos);
};
CHdrFtrController.prototype.SelectAll = function()
{
	this.HdrFtr.Select_All();
};
CHdrFtrController.prototype.GetSelectedContent = function(SelectedContent)
{
	this.HdrFtr.Get_SelectedContent(SelectedContent);
};
CHdrFtrController.prototype.UpdateCursorType = function(X, Y, PageAbs, MouseEvent)
{
	this.HdrFtr.Update_CursorType(X, Y, PageAbs, MouseEvent);
};
CHdrFtrController.prototype.PasteFormatting = function(TextPr, ParaPr)
{
	this.HdrFtr.Paragraph_Format_Paste(TextPr, ParaPr, false);
};
CHdrFtrController.prototype.IsSelectionUse = function()
{
	return this.HdrFtr.Is_SelectionUse();
};
CHdrFtrController.prototype.IsTextSelectionUse = function()
{
	return this.HdrFtr.Is_TextSelectionUse();
};
CHdrFtrController.prototype.GetCurPosXY = function()
{
	return this.HdrFtr.Get_CurPosXY();
};
CHdrFtrController.prototype.GetSelectedText = function(bClearText, oPr)
{
	return this.HdrFtr.Get_SelectedText(bClearText, oPr);
};
CHdrFtrController.prototype.GetCurrentParagraph = function()
{
	return this.HdrFtr.Get_CurrentParagraph();
};
CHdrFtrController.prototype.GetSelectedElementsInfo = function(oInfo)
{
	this.HdrFtr.Get_SelectedElementsInfo(oInfo);
};
CHdrFtrController.prototype.AddTableRow = function(bBefore)
{
	this.HdrFtr.Table_AddRow(bBefore);
};
CHdrFtrController.prototype.AddTableCol = function(bBefore)
{
	this.HdrFtr.Table_AddCol(bBefore);
};
CHdrFtrController.prototype.RemoveTableRow = function()
{
	this.HdrFtr.Table_RemoveRow();
};
CHdrFtrController.prototype.RemoveTableCol = function()
{
	this.HdrFtr.Table_RemoveCol();
};
CHdrFtrController.prototype.MergeTableCells = function()
{
	this.HdrFtr.Table_MergeCells();
};
CHdrFtrController.prototype.SplitTableCells = function(Cols, Rows)
{
	this.HdrFtr.Table_SplitCell(Cols, Rows);
};
CHdrFtrController.prototype.RemoveTable = function()
{
	this.HdrFtr.Table_RemoveTable();
};
CHdrFtrController.prototype.SelectTable = function(Type)
{
	this.HdrFtr.Table_Select(Type);
};
CHdrFtrController.prototype.CanMergeTableCells = function()
{
	return this.HdrFtr.Table_CheckMerge();
};
CHdrFtrController.prototype.CanSplitTableCells = function()
{
	return this.HdrFtr.Table_CheckSplit();
};
CHdrFtrController.prototype.UpdateInterfaceState = function()
{
	this.LogicDocument.Interface_Update_HdrFtrPr();
	this.HdrFtr.Document_UpdateInterfaceState();
};
CHdrFtrController.prototype.UpdateRulersState = function()
{
	this.DrawingDocument.Set_RulerState_Paragraph(null);
	this.HdrFtr.Document_UpdateRulersState(this.LogicDocument.CurPage);
};
CHdrFtrController.prototype.UpdateSelectionState = function()
{
	this.HdrFtr.Document_UpdateSelectionState();
	this.LogicDocument.Document_UpdateTracks();
};
CHdrFtrController.prototype.GetSelectionState = function()
{
	return this.HdrFtr.Get_SelectionState();
};
CHdrFtrController.prototype.SetSelectionState = function(State, StateIndex)
{
	this.HdrFtr.Set_SelectionState(State, StateIndex);	
};
CHdrFtrController.prototype.AddHyperlink = function(Props)
{
	this.HdrFtr.Hyperlink_Add(Props);
};
CHdrFtrController.prototype.ModifyHyperlink = function(Props)
{
	this.HdrFtr.Hyperlink_Modify(Props);
};
CHdrFtrController.prototype.RemoveHyperlink = function()
{
	this.HdrFtr.Hyperlink_Remove();
};
CHdrFtrController.prototype.CanAddHyperlink = function(bCheckInHyperlink)
{
	return this.HdrFtr.Hyperlink_CanAdd(bCheckInHyperlink);
};
CHdrFtrController.prototype.IsCursorInHyperlink = function(bCheckEnd)
{
	return this.HdrFtr.Hyperlink_Check(bCheckEnd);
};
CHdrFtrController.prototype.AddComment = function(Comment)
{
	this.HdrFtr.Add_Comment(Comment);
};
CHdrFtrController.prototype.CanAddComment = function()
{
	return this.HdrFtr.CanAdd_Comment();
};
CHdrFtrController.prototype.GetSelectionAnchorPos = function()
{
	return this.HdrFtr.Get_SelectionAnchorPos();
};
CHdrFtrController.prototype.StartSelectionFromCurPos = function()
{
	this.HdrFtr.StartSelectionFromCurPos();
};
CHdrFtrController.prototype.SaveDocumentStateBeforeLoadChanges = function(State)
{
	var HdrFtr = this.HdrFtr.Get_CurHdrFtr();
	if (null !== HdrFtr)
	{
		var HdrFtrContent = HdrFtr.Get_DocumentContent();
		State.HdrFtr      = HdrFtr;

		State.HdrFtrDocPosType = HdrFtrContent.CurPos.Type;
		State.HdrFtrSelection  = HdrFtrContent.Selection.Use;

		if (docpostype_Content === HdrFtrContent.Get_DocPosType())
		{
			State.Pos      = HdrFtrContent.GetContentPosition(false, false, undefined);
			State.StartPos = HdrFtrContent.GetContentPosition(true, true, undefined);
			State.EndPos   = HdrFtrContent.GetContentPosition(true, false, undefined);
		}
		else if (docpostype_DrawingObjects === HdrFtrContent.Get_DocPosType())
		{
			this.LogicDocument.DrawingObjects.Save_DocumentStateBeforeLoadChanges(State);
		}
	}
};
CHdrFtrController.prototype.RestoreDocumentStateAfterLoadChanges = function(State)
{
	var HdrFtr = State.HdrFtr;
	if (null !== HdrFtr && undefined !== HdrFtr && true === HdrFtr.Is_UseInDocument())
	{
		this.HdrFtr.Set_CurHdrFtr(HdrFtr);
		var HdrFtrContent = HdrFtr.Get_DocumentContent();
		if (docpostype_Content === State.HdrFtrDocPosType)
		{
			HdrFtrContent.Set_DocPosType(docpostype_Content);
			HdrFtrContent.Selection.Use = State.HdrFtrSelection;
			if (true === HdrFtrContent.Selection.Use)
			{
				HdrFtrContent.SetContentPosition(State.StartPos, 0, 0);
				HdrFtrContent.SetContentSelection(State.StartPos, State.EndPos, 0, 0, 0);
			}
			else
			{
				HdrFtrContent.SetContentPosition(State.Pos, 0, 0);
				this.LogicDocument.NeedUpdateTarget = true;
			}
		}
		else if (docpostype_DrawingObjects === State.HdrFtrDocPosType)
		{
			HdrFtrContent.Set_DocPosType(docpostype_DrawingObjects);

			if (true !== this.LogicDocument.DrawingObjects.Load_DocumentStateAfterLoadChanges(State))
			{
				HdrFtrContent.Set_DocPosType(docpostype_Content);
				HdrFtrContent.MoveCursorToStartPos();
			}
		}
	}
	else
	{
		this.LogicDocument.EndHdrFtrEditing(false);
	}
};
CHdrFtrController.prototype.GetColumnSize = function()
{
	var CurHdrFtr = this.HdrFtr.CurHdrFtr;
	if (null !== CurHdrFtr && -1 !== CurHdrFtr.RecalcInfo.CurPage)
	{
		var Page   = this.LogicDocument.Pages[CurHdrFtr.RecalcInfo.CurPage];
		var SectPr = this.LogicDocument.Get_SectPr(Page.Pos);

		var Y      = SectPr.Get_PageMargin_Top();
		var YLimit = SectPr.Get_PageHeight() - SectPr.Get_PageMargin_Bottom();
		var X      = SectPr.Get_PageMargin_Left();
		var XLimit = SectPr.Get_PageWidth() - SectPr.Get_PageMargin_Right();

		return {
			W : XLimit - X,
			H : YLimit - Y
		};
	}

	return {W : 0, H : 0};
};
CHdrFtrController.prototype.GetCurrentSectionPr = function()
{
	return null;
};
CHdrFtrController.prototype.RemoveTextSelection = function()
{
	var CurHdrFtr = this.HdrFtr.CurHdrFtr;
	if (null != CurHdrFtr)
		return CurHdrFtr.Content.RemoveTextSelection();
};