define('app/views/user_menu', ['ember', 'md5'],
    /**
     *  User Menu View
     *
     *  @returns Class
     */
    function() {

        'use strict';

        return App.UserMenuComponent = Ember.Component.extend({

            //
            //  Properties
            //

            layoutName: 'user_menu',
            isNotCore: !IS_CORE,
            accountUrl: URL_PREFIX + '/account',
            gravatarURL: EMAIL && ('https://www.gravatar.com/avatar/' + md5(EMAIL) + '?d=' +
                encodeURIComponent('https://mist.io/resources/images/sprite-images/user.png') + '&s=' + (window.devicePixelRatio > 1.5 ? 100 : 50)),
            hasName: Ember.computed(function() {
                return FIRST_NAME && LAST_NAME;
            }),
            gravatarName: Ember.computed('hasName', function() {
                return this.get('hasName') ? FIRST_NAME + ' ' + LAST_NAME : EMAIL;
            }),
            hasOrganization: Ember.computed('Mist.organization.id', function() {
                return !!Mist.organization.id;
            }),
            // isActive: Ember.computed('Mist.organization', 'Mist.org')
            memberTeam: Ember.computed('hasOrganization', function() {
                return 'needs work';
                // return this.get('hasOrganization') ? Mist.teamsController.model.slice().shift().name : null;
            }),

            //
            //  Actions
            //

            actions: {
                meClicked: function() {
                    $('#user-menu-popup').popup('open');
                },

                addOrganizationClicked: function() {
                    $('#user-menu-popup').popup('close');
                    Ember.run.later(function() {
                        Mist.organizationAddController.open();
                    }, 300);
                },

                loginClicked: function() {
                    $('#user-menu-popup').popup('close');
                    Ember.run.later(function() {
                        Mist.loginController.open();
                    }, 300);
                },

                logoutClicked: function() {
                    Mist.loginController.logout();
                }
            }
        });
    }
);
