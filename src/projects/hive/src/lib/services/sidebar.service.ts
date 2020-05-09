import { Injectable } from '@angular/core';

import { HiveSidebarComponent } from 'projects/hive/src/lib/components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root',
})
export class HiveSidebarService {
  // Private
  private registry: { [key: string]: HiveSidebarComponent } = {};

  constructor() {}

  register(key: any, sidebar: any): void {
    // Check if the key already being used
    if (this.registry[key]) {
      console.error(
        `The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`
      );

      return;
    }

    // Add to the registry
    this.registry[key] = sidebar;
  }

  unregister(key: any): void {
    // Check if the sidebar exists
    if (!this.registry[key]) {
      console.warn(
        `The sidebar with the key '${key}' doesn't exist in the registry.`
      );
    }

    // Unregister the sidebar
    delete this.registry[key];
  }

  getSidebar(key: any): HiveSidebarComponent {
    // Check if the sidebar exists
    if (!this.registry[key]) {
      console.warn(
        `The sidebar with the key '${key}' doesn't exist in the registry.`
      );

      return;
    }

    // Return the sidebar
    return this.registry[key];
  }
}
