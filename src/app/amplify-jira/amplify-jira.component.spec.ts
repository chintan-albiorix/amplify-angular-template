import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifyJiraComponent } from './amplify-jira.component';

describe('AmplifyJiraComponent', () => {
  let component: AmplifyJiraComponent;
  let fixture: ComponentFixture<AmplifyJiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmplifyJiraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmplifyJiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
