import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

fdescribe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(() => {

    const spy = jasmine.createSpyObj('UserService', ['getUsers']);

    TestBed.configureTestingModule({
      providers: [UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get user data', () => {
    const mockUsers = [
      { name: "Virat", email: "virat18@gmail.com" },
      { name: "Dev", email: "dev37@gmail.com" },
    ]
    userService.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(1);
    })


  })
});
