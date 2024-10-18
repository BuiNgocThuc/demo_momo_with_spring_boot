import { StyleSheet } from '@react-pdf/renderer'

export const BILL_STYLES = StyleSheet.create({
  page: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    fontFamily: 'Helvetica',
  },
  page_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #000000',
    height: 100,
    width: '100%',
  },
  page_top_container_img: {
    width: 80,
    height: 80,
  },
  page_top_container_img_logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  page_top_centerText: {
    fontSize: 20,
    fontWeight: 'extrabold',
    textTransform: 'uppercase',
    letterSpacing: 1.25,
  },
  topLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
    fontSize: 11,
  },
  'page-bottom': {
    paddingVertical: 15,
    fontSize: 12,
    gap: 4,
  },
  headerText: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    marginVertical: 8,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e4e4e4', // Only bottom border for rows
  },
  tableCellHeader: {
    width: '20%',
    backgroundColor: '#e4e4e4',
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRight: '1px solid #e4e4e4', // Only right border
    borderBottom: '1px solid #e4e4e4', // Bottom border
  },
  tableCell: {
    width: '20%',
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    borderRight: '1px solid #e4e4e4', // Only right border
  },
  // Last column cells won't have a right border
  lastColumnCell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  tableFirstCell: {
    borderLeft: '1px solid #e4e4e4',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e4e4e4',
  },
  section: {
    marginBottom: 4,
    fontSize: 10,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
})
