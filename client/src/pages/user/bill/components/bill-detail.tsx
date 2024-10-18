import { Document, Page, Text, View, Image } from '@react-pdf/renderer'
import Logo from '@assets/logo.jpg'
import { formatDateWithSlash, generateInvoiceNumber } from '@/utils/Generate'
import { BILL_STYLES } from '@/constant/css/Bill'
import QrGetMoney from '@assets/qeGetMoney.jpg'
const BillDetail = ({ id }: { id: number }) => {
  return (
    <>
      <Document title="Package PDF" author="Jack Phat" language="vi-vn">
        <Page size="A4" style={BILL_STYLES.page}>
          <View style={BILL_STYLES.page_top}>
            <View style={BILL_STYLES.page_top_container_img}>
              <Image
                src={Logo}
                fixed
                style={BILL_STYLES.page_top_container_img_logo}
              />
            </View>
            <Text style={BILL_STYLES.page_top_centerText}>BILLS</Text>
            <View style={BILL_STYLES.topLeft}>
              <Text>Date: {formatDateWithSlash()}</Text>
              <Text>Serial: {generateInvoiceNumber(id)}</Text>
            </View>
          </View>
          <View
            style={[
              BILL_STYLES['page-bottom'],
              { flexDirection: 'column', width: '100%' },
            ]}>
            <View style={{ flexDirection: 'row', marginBottom: 2, gap: 4 }}>
              <Text>Sender:</Text>
              <Text>ZTech Apartment's Manager</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2, gap: 4 }}>
              <Text>Customer's name:</Text>
              <Text>Bui Hong Bao</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2, gap: 4 }}>
              <Text>Room:</Text>
              <Text>101</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2, gap: 4 }}>
              <Text>Phone number:</Text>
              <Text>(+84) 123456789</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2, gap: 4 }}>
              <Text>Bill Date:</Text>
              <Text>15/10/2024</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text style={BILL_STYLES.headerText}>electric usage table</Text>
              <View></View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={BILL_STYLES.headerText}>Water Usage Table</Text>
              <View style={BILL_STYLES.table}>
                {/* Table Header */}
                <View style={BILL_STYLES.tableRow}>
                  <Text style={BILL_STYLES.tableCellHeader}>
                    Opening Read Date
                  </Text>
                  <Text style={BILL_STYLES.tableCellHeader}>Opening Read</Text>
                  <Text style={BILL_STYLES.tableCellHeader}>
                    Closing Read Date
                  </Text>
                  <Text style={BILL_STYLES.tableCellHeader}>Closing Read</Text>
                  <Text style={BILL_STYLES.tableCellHeader}>Usage(m³)</Text>
                </View>
                {/* Table Body (Sample Data) */}
                <View style={BILL_STYLES.tableRow}>
                  <Text
                    style={[BILL_STYLES.tableCell, BILL_STYLES.tableFirstCell]}>
                    07/03/2013
                  </Text>
                  <Text style={BILL_STYLES.tableCell}>579.8</Text>
                  <Text style={BILL_STYLES.tableCell}>31/03/2013</Text>
                  <Text style={BILL_STYLES.tableCell}>677.2</Text>
                  <Text style={BILL_STYLES.tableCell}>97.4</Text>
                </View>
                <View style={BILL_STYLES.tableRow}>
                  <Text
                    style={[BILL_STYLES.tableCell, BILL_STYLES.tableFirstCell]}>
                    01/04/2013
                  </Text>
                  <Text style={BILL_STYLES.tableCell}>677.2</Text>
                  <Text style={BILL_STYLES.tableCell}>07/04/2013</Text>
                  <Text style={BILL_STYLES.tableCell}>703.0</Text>
                  <Text style={BILL_STYLES.tableCell}>25.8</Text>
                </View>
                {/* Table Footer */}
                <View
                  style={[
                    BILL_STYLES.tableRow,
                    {
                      justifyContent: 'flex-end',
                    },
                  ]}>
                  <Text
                    style={[
                      BILL_STYLES.lastColumnCell,
                      {
                        width: '20%',
                      },
                      BILL_STYLES.tableCell,
                      BILL_STYLES.tableCellHeader,
                    ]}>
                    Value-Added Tax
                  </Text>
                  <Text
                    style={[
                      BILL_STYLES.lastColumnCell,
                      {
                        width: '20%',
                      },
                      BILL_STYLES.tableCell,
                    ]}>
                    5%
                  </Text>
                  <Text
                    style={[
                      BILL_STYLES.lastColumnCell,
                      BILL_STYLES.tableCell,
                      {
                        width: '20%',
                        fontFamily: 'Helvetica-Bold',
                      },
                    ]}>
                    $123.2
                  </Text>
                </View>
                <View
                  style={[
                    BILL_STYLES.tableRow,
                    {
                      justifyContent: 'flex-end',
                    },
                  ]}>
                  <Text
                    style={[
                      BILL_STYLES.lastColumnCell,
                      {
                        backgroundColor: 'black',
                        color: 'white',
                        width: '80%',
                      },
                    ]}>
                    Total Due
                  </Text>
                  <Text
                    style={[
                      BILL_STYLES.lastColumnCell,
                      BILL_STYLES.tableCell,
                      {
                        width: '20%',
                        fontFamily: 'Helvetica-Bold',
                      },
                    ]}>
                    $123.2
                  </Text>
                </View>
              </View>
            </View>
            <View style={BILL_STYLES.separator}></View>
            <View style={{ paddingVertical: 4 }}>
              <Text style={BILL_STYLES.title}>
                Payment is due 30 days from bill date
              </Text>
              <Text style={BILL_STYLES.section}>
                If the customer does not make the payment by the deadline, the
                condominium will temporarily suspend the water supply according
                to the contract. To restore the water supply, the customer must
                settle all outstanding debts and associated costs as per
                regulations.
              </Text>

              <Text style={BILL_STYLES.section}>
                If payment has already been made or if there is a complaint,
                please disregard this notice.
              </Text>
            </View>
            <View style={BILL_STYLES.separator}></View>
            <Text
              style={{
                fontSize: 10,
                padding: 2.5,

                fontFamily: 'Times-Italic',
              }}>
              Any questions please contact: 0123456789
            </Text>
            <Text
              style={{
                fontSize: 10,
                padding: 2.5,

                fontFamily: 'Times-Italic',
              }}>
              Best regards!
            </Text>
          </View>
        </Page>
      </Document>
    </>
  )
}

export default BillDetail
