angular
    .module('AddressBook', [])
    .constant('CONTACTS_URL', 'http://localhost:9001/contacts')
    .service('ContactService', ['$http', 'CONTACTS_URL', ContactService])
    .factory('ContactStore', ['$http', 'CONTACTS_URL', ContactStore])
    .controller('ContactController', ['ContactService', 'ContactStore', '$scope', ContactController])
    .filter('proper', function() {
        return function(name) {
            var type = typeof name;

            if(type!=="string" && type!=="number" ) throw new Error();

            return name.toString().split(" ")
                .map(function(word) {
                    return word[0].toUpperCase() + word.substr(1).toLowerCase();
                }).join(' ');
        }
    })
    .directive('avatar', function() {
        return {
            restrict: 'AE',
            scope: {
                name:"="
            },
            template: '<span class="avatar">{{name[0] | proper}}</span>'
        };
    })
;

function ContactService($http, CONTACTS_URL) {
    var service = this;

    service.contacts = [];
    $http
        .get(CONTACTS_URL)
        .then(function(res) {
            console.log(res);
            var data = res.data;
            while(data[0]) service.contacts.push(data.pop());
            //service.contacts = res.data;
        });
}

function ContactController(ContactService, ContactStore, $scope) {
    var vm = $scope;

    vm.contacts = ContactService.contacts;
    //vm.contacts = [];
    // ContactStore.all()
    //     .then(function(contacts) {
    //         vm.contacts = contacts;
    //    });
}

function ContactStore($http, CONTACTS_URL) {
    return {
        all: function() {
            return $http
                .get(CONTACTS_URL)
                .then(_.property('data'))
        }
    };
}
