export interface MenuItem {
  id: number,
  label: string,
  icon?: string,
  route?: string,
  roles: string[];
  children?: MenuItem[]
}
