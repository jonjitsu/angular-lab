'use strict';

angular
    .module('jonsContacts.contacts', ['ngRoute', 'firebase'])
    .config(['$routeProvider', contactsConfig])
    .controller('ContactsCtrl', ['$scope', 'ContactStore', ContactsCtrl])
    //.constant('FIREBASE_URL', 'https://jonscontacts.firebaseapp.com')
    .constant('FIREBASE_URL', 'https://jonscontacts.firebaseio.com/contacts')
    .factory('ContactStore', ['$firebaseArray', 'FIREBASE_URL', ContactStore])
;

function contactsConfig($routeProvider) {
   $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}
function ContactStore($firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL),
        contacts = $firebaseArray(ref)
    ;


    return {
        get: function() {
            return contacts;
        },
        add: function(contact) {
            return contacts.$add(contact);
        }
    };
}

/* utils */
function extract(obj, fields, defaultValue) {
    return fields.reduce(function(subObj, field, i) {
        if( obj[field] ) subObj[field] = obj[field];
        else subObj[field] = defaultValue;
        return subObj;
    }, {});
}
function setValue(obj, fields, value) {
    fields.forEach(function(prop) {
        obj[prop] = value;
    });
    return obj;
}
function ContactsCtrl($scope, ContactStore) {
    var vm = $scope,
        contacts = vm.contacts = ContactStore.get();

    vm.showAddForm = function() {
        vm.addFormShow = true;
    };

    vm.hideAddForm = function() {
        vm.addFormShow = false;
    };

    vm.addContact = function() {
        console.log('adding contact...');

        var contact = extract(vm, ['name','email','company'], null);
        contact.phones = [
            {
                mobile: vm.mobile_phone,
                home:   vm.home_phone,
                work:   vm.work_phone
            }
        ];

        ContactStore.add(contact)
            .then(function(ref) {
                var id = ref;
                console.log('added contact, id: ' + id);

                clearFields();

                vm.hideAddForm();

                vm.msg = "Contact added successfully!";
            });
        function ClearFields() {
            setValue(vm, ['name','email','company', 'work_phone', 'mobile_phone', 'home_phone'], '');
        }
    }
}
