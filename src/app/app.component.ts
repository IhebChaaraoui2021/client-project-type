import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'advanced-preloading';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
   /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.children) {
          const childRoutes = this.activatedRoute.children;
          childRoutes.forEach((childRoute) => {
          childRoute.routeConfig.children?.forEach((route) => {
              if (!route.canActivate && route.loadChildren && route.data?.preload) {
                route[this.loadChildren]?.();
              }
            }
            );
          );
        }
      }
    });*/
  }
  private get loadChildren(): string {
    return 'loadChildren';
  }
}
