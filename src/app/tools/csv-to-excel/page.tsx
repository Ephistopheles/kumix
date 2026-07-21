import { ToolLayout } from '@/shared/ui'
import { CsvToExcel } from '@/features/excel'

export default function CsvToExcelPage() {
  return (
    <ToolLayout
      title="CSV to Excel"
      description="Convert CSV files to Excel spreadsheets (.xlsx). Upload or paste your CSV data."
      badge="new"
      breadcrumbs={[
        { label: 'Excel' },
        { label: 'CSV to Excel' },
      ]}
      slug="csv-to-excel"
    >
      <CsvToExcel />
    </ToolLayout>
  )
}
