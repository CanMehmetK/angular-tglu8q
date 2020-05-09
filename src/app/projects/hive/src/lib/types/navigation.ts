export interface Tag {
  title?: string;
  translate?: string;
  bg?: string;
  fg?: string;
  color: string; // Background Color
  value: string;
}

export interface IHiveMenuItem {
  id?: string;
  title?: string;
  type?:
    | 'item'
    | 'group'
    | 'collapsable'
    // ------------------------------------
    | 'link'
    | 'sub'
    | 'extLink'
    | 'extTabLink';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: Tag;
  children?: IHiveMenuItem[];
  // -------------------------------------
  state?: string;
  name?: string;
}

export interface IHiveMenu extends IHiveMenuItem {
  children?: IHiveMenuItem[];
  // -------------------------------------
  state?: string;
  name?: string;
  type?:
    | 'item'
    | 'group'
    | 'collapsable'
    // ------------------------------------
    | 'link'
    | 'sub'
    | 'extLink'
    | 'extTabLink';
  icon?: string;
  label?: Tag;
  badge?: Tag;
}
