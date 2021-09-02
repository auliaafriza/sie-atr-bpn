/* eslint-disable prettier/prettier */
import * as ExcelJs from 'exceljs/dist/exceljs'
import { saveAs } from 'file-saver'
// import {formatDate} from './dateFormat'
import moment from 'moment'


function generateColumns(data) {
	// let _data = []
	let _columns = []
	data.forEach((col) => {
		_columns.push({
			header: col.name,
			key: col.key.trim(),
			width: 15
		})
	})
	return _columns
}

// const formatData = (data, ) =>{
// 	let dataRes = []
// 	data && data.forEach(dataArray => {
// 		dataArray.date = formatDate(dataArray.date,'DD-MMM-YYYY')
// 		dataRes.push(dataArray)
// 	})
// 	return dataRes
// }

async function exportFile(columns,namaFile, datas, typeFile) {
	const workbook = new ExcelJs.Workbook()
	const worksheet = workbook.addWorksheet()
	const tempColumns = generateColumns(columns)
	worksheet.columns = tempColumns
	// let dataRow = formatData(datas)
	worksheet.addRows(datas)
	let rows = worksheet.getRow(1)


	//set first row or header backgroundColor 
	// worksheet.getRow(1).fill = {
	// 	type: 'pattern',
	// 	pattern: 'solid',
	// 	bgColor: { argb: 'FF79BBE1' }
	// }
	
	// set autofilter 
	worksheet.autoFilter = {
		from: rows._cells[0]._address,
		to: rows._cells[rows._cells.length - 1]._address
	}


	// filter column with currency format
	let currencyFormats = columns.filter((value) => value.format == 'currency')
	currencyFormats.forEach((currency) => {
		worksheet.getColumn(currency.key).numFmt = '$#,##0.00'
	})

	
	const buffer = await workbook.xlsx.writeBuffer()
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const fileExtension = typeFile ? typeFile :'.xlsx'
	const blob = new Blob([buffer], { type: fileType })
	const timeDownload = moment(new Date()).format('DD MMM YYYY - HH.mm')
	const fileName = namaFile ? namaFile : 'fileName' 
	saveAs(blob, fileName  + ' - '+ timeDownload + fileExtension)
}

export function fileExport(column,namaFile, datas, typeFile) {
	exportFile(column,namaFile, datas, typeFile)
}
