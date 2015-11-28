var assert = chai.assert,
    expect = chai.expect
;
describe("The Address Book App", function(){
    describe('the contact service', function() {
        beforeEach(function() {
            module('AddressBook');
            inject(function($injector) {
                contactService = $injector.get('ContactService');
                $httpBackend = $injector.get('$httpBackend');
                CONTACTS_URL = $injector.get('CONTACTS_URL')
            });
        });

        it('should have a property contacts, an array', function() {
            expect(contactService.contacts).to.be.an('array');
        });

        it('should call the backend', function() {
            $httpBackend
                .expectGET(CONTACTS_URL)
                .respond(200, []);
            $httpBackend.flush();
        });
    });


    describe('the contact controller', function() {
        beforeEach(function() {
            module('AddressBook');
            inject(function($injector, $rootScope) {
                $scope = $rootScope.$new();
                ContactService = $injector.get('ContactService');
                $httpBackend = $injector.get('$httpBackend');
                $controller = $injector.get('$controller');
            });
        });

        it ("should store an array of contacts in scope", function(){
            $controller("ContactController", {$scope:$scope, ContactService:ContactService});
            assert.isArray($scope.contacts);
        })
    });


    describe('the proper filter', function() {
        beforeEach(function(){
            module('AddressBook');
            inject(function($injector) {
                proper = $injector.get('$filter')('proper');
            });
        });

        it ('should proper case a string', function() {
            expect(proper('ned stark')).to.equal('Ned Stark');
            expect(proper('bLAH bLOP')).to.equal('Blah Blop');
        });

        it ('should take a anumber and return that as a string', function() {
            expect(proper(42)).to.equal('42');
        });

        it ('should throw an error on an incompatible type', function() {
            assert.throws(function() {
                proper(undefined);
                // proper("asdf");
            })
        })
    });


    describe('avatar', function() {
        beforeEach(function() {
            module('AddressBook');
        });

        it( 'should display the capitalized first letter of a name', function() {
            inject(function($rootScope, $compile) {
                var element, dirText;

                $rootScope.contact = {name: 'jon dope'};
                element = $compile('<avatar name="contact.name"/>')($rootScope);
                $rootScope.$digest();
                dirText = element.text();

                expect(dirText).to.equal('J');
            });
        });
    });
});
