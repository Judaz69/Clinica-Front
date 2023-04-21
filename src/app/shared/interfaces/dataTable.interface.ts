export interface DataTable 
{
    label: string;
    def: string;
    dataKey: string;
    formatt?: string;
    dataType?: 'date' | 'object';
}