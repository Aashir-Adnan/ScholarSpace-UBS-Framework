-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 02:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ubs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `attachment_id` int(11) NOT NULL,
  `attachment_name` varchar(255) DEFAULT NULL,
  `attachment_type` varchar(50) DEFAULT NULL,
  `attachment_size` int(11) DEFAULT NULL,
  `attachment_link` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatting_groups`
--

CREATE TABLE `chatting_groups` (
  `chatting_group_id` int(11) NOT NULL,
  `chatting_group_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatting_group_members`
--

CREATE TABLE `chatting_group_members` (
  `chatting_group_member_id` int(11) NOT NULL,
  `chatting_group_id` int(11) DEFAULT NULL,
  `user_role_designation_department_id` int(11) DEFAULT NULL,
  `chatting_group_permission_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `designation_id` int(11) NOT NULL,
  `designation_name` varchar(255) DEFAULT NULL,
  `senior_designation_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `device_otp`
--

CREATE TABLE `device_otp` (
  `device_otp_id` int(11) NOT NULL,
  `user_device_id` int(11) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_failure_count` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dynamic_attachments`
--

CREATE TABLE `dynamic_attachments` (
  `dynamic_attachment_id` int(11) NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `primary_key` int(11) NOT NULL,
  `attachment_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sent_by_user_role_department_id` int(11) DEFAULT NULL,
  `recepient_user_role_department_id` int(11) DEFAULT NULL,
  `recepient_chatting_group_id` int(11) DEFAULT NULL,
  `message_title` varchar(255) DEFAULT NULL,
  `message_body` text DEFAULT NULL,
  `attachement_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `notification_title` varchar(255) DEFAULT NULL,
  `notification_message` text DEFAULT NULL,
  `sent_to_user_role_designation_department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_groups`
--

CREATE TABLE `permission_groups` (
  `permission_group_id` int(11) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_groups_permissions`
--

CREATE TABLE `permission_groups_permissions` (
  `permission_group_permission_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `platform_id` int(11) NOT NULL,
  `platform_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `platform_versions`
--

CREATE TABLE `platform_versions` (
  `platform_version_id` int(11) NOT NULL,
  `version_id` int(11) DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `encryption_key` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `senior_role_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles_designations_department`
--

CREATE TABLE `roles_designations_department` (
  `role_designation_department_id` int(11) NOT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `task_title` varchar(255) DEFAULT NULL,
  `task_description` text DEFAULT NULL,
  `parent_task_id` int(11) NOT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `task_flow_id` int(11) DEFAULT NULL,
  `task_assigned_to_user_role_designation_department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_flows`
--

CREATE TABLE `task_flows` (
  `task_flow_id` int(11) NOT NULL,
  `task_flow_title` varchar(255) DEFAULT NULL,
  `task_flow_description` text DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL,
  `created_by_user_role_designation_department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_flow_steps`
--

CREATE TABLE `task_flow_steps` (
  `task_flow_step_id` int(11) NOT NULL,
  `task_flow_id` int(11) DEFAULT NULL,
  `step_title` varchar(255) DEFAULT NULL,
  `step_description` text DEFAULT NULL,
  `step_order` int(11) DEFAULT NULL,
  `is_cross_department` tinyint(1) DEFAULT NULL,
  `step_assigned_to_role_department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_history`
--

CREATE TABLE `task_history` (
  `task_history_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `task_flow_step_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `action_by_user_role_designation_department_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `template_id` int(11) NOT NULL,
  `created_by_user_designation_department_id` int(11) DEFAULT NULL,
  `template_type` varchar(255) DEFAULT NULL,
  `template_title` varchar(255) DEFAULT NULL,
  `template_body` text DEFAULT NULL,
  `template_desc` text DEFAULT NULL,
  `template_sender_email` varchar(255) DEFAULT NULL,
  `template_department` int(11) DEFAULT NULL,
  `list_of_attributes` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `test` tinyint(1) NOT NULL,
  `signIn_flag` varchar(255) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `cnic` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `image_attachment_id` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `blood_group` varchar(50) DEFAULT NULL,
  `religion` enum('Islam','Christianity','Buddhism','Atheism') DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_devices`
--

CREATE TABLE `user_devices` (
  `user_device_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `device_token` varchar(255) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `platform_version_id` int(11) DEFAULT NULL,
  `os_version` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_device_notifications`
--

CREATE TABLE `user_device_notifications` (
  `user_device_notification_id` int(11) NOT NULL,
  `user_device_id` int(11) DEFAULT NULL,
  `notification_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles_designations_department`
--

CREATE TABLE `user_roles_designations_department` (
  `user_role_designation_department_id` int(11) NOT NULL,
  `role_designation_department_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_role_designation_permissions`
--

CREATE TABLE `user_role_designation_permissions` (
  `user_role_designation_permission_id` int(11) NOT NULL,
  `user_role_designation_department_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `excluded_id` varchar(500) DEFAULT NULL,
  `included_id` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `versions`
--

CREATE TABLE `versions` (
  `version_id` int(11) NOT NULL,
  `version` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `fk_attachments_created_by` (`created_by`),
  ADD KEY `fk_attachments_updated_by` (`updated_by`);

--
-- Indexes for table `chatting_groups`
--
ALTER TABLE `chatting_groups`
  ADD PRIMARY KEY (`chatting_group_id`),
  ADD KEY `fk_chatting_groups_created_by` (`created_by`),
  ADD KEY `fk_chatting_groups_updated_by` (`updated_by`);

--
-- Indexes for table `chatting_group_members`
--
ALTER TABLE `chatting_group_members`
  ADD PRIMARY KEY (`chatting_group_member_id`),
  ADD KEY `user_role_designation_department_id` (`user_role_designation_department_id`),
  ADD KEY `chatting_group_permission_id` (`chatting_group_permission_id`),
  ADD KEY `fk_chatting_group_members_created_by` (`created_by`),
  ADD KEY `fk_chatting_group_members_updated_by` (`updated_by`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `AK` (`department_name`),
  ADD KEY `fk_departments_created_by` (`created_by`),
  ADD KEY `fk_departments_updated_by` (`updated_by`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`designation_id`),
  ADD UNIQUE KEY `AK` (`designation_name`),
  ADD KEY `fk_designations_created_by` (`created_by`),
  ADD KEY `fk_designations_updated_by` (`updated_by`);

--
-- Indexes for table `device_otp`
--
ALTER TABLE `device_otp`
  ADD PRIMARY KEY (`device_otp_id`),
  ADD KEY `AK` (`user_device_id`,`otp`),
  ADD KEY `fk_device_otp_created_by` (`created_by`),
  ADD KEY `fk_device_otp_updated_by` (`updated_by`);

--
-- Indexes for table `dynamic_attachments`
--
ALTER TABLE `dynamic_attachments`
  ADD PRIMARY KEY (`dynamic_attachment_id`),
  ADD KEY `fk_dynamic_attachments_attachment_id` (`attachment_id`),
  ADD KEY `fk_dynamic_attachments_created_by` (`created_by`),
  ADD KEY `fk_dynamic_attachments_updated_by` (`updated_by`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `recepient_chatting_group_id` (`recepient_chatting_group_id`),
  ADD KEY `recepient_user_role_department_id` (`recepient_user_role_department_id`),
  ADD KEY `sent_by_user_role_department_id` (`sent_by_user_role_department_id`),
  ADD KEY `fk_messages_created_by` (`created_by`),
  ADD KEY `fk_messages_updated_by` (`updated_by`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `sent_to_user_role_designation_department_id` (`sent_to_user_role_designation_department_id`),
  ADD KEY `AK` (`notification_title`),
  ADD KEY `fk_notifications_created_by` (`created_by`),
  ADD KEY `fk_notifications_updated_by` (`updated_by`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`),
  ADD UNIQUE KEY `AK` (`permission_name`),
  ADD KEY `fk_permissions_created_by` (`created_by`),
  ADD KEY `fk_permissions_updated_by` (`updated_by`);

--
-- Indexes for table `permission_groups`
--
ALTER TABLE `permission_groups`
  ADD PRIMARY KEY (`permission_group_id`),
  ADD UNIQUE KEY `AK` (`group_name`),
  ADD KEY `fk_permission_groups_created_by` (`created_by`),
  ADD KEY `fk_permission_groups_updated_by` (`updated_by`);

--
-- Indexes for table `permission_groups_permissions`
--
ALTER TABLE `permission_groups_permissions`
  ADD PRIMARY KEY (`permission_group_permission_id`),
  ADD KEY `permission_id` (`permission_id`),
  ADD KEY `AK` (`group_id`,`permission_id`),
  ADD KEY `fk_permission_groups_permissions_created_by` (`created_by`),
  ADD KEY `fk_permission_groups_permissions_updated_by` (`updated_by`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`platform_id`),
  ADD UNIQUE KEY `idx_platform_name_status_updated_by` (`platform_name`),
  ADD KEY `fk_platforms_created_by` (`created_by`),
  ADD KEY `fk_platforms_updated_by` (`updated_by`);

--
-- Indexes for table `platform_versions`
--
ALTER TABLE `platform_versions`
  ADD PRIMARY KEY (`platform_version_id`),
  ADD KEY `platform_id` (`platform_id`),
  ADD KEY `version_id` (`version_id`),
  ADD KEY `fk_platform_versions_created_by` (`created_by`),
  ADD KEY `fk_platform_versions_updated_by` (`updated_by`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `AK` (`role_name`),
  ADD KEY `fk_senior_role` (`senior_role_id`),
  ADD KEY `fk_roles_created_by` (`created_by`),
  ADD KEY `fk_roles_updated_by` (`updated_by`);

--
-- Indexes for table `roles_designations_department`
--
ALTER TABLE `roles_designations_department`
  ADD PRIMARY KEY (`role_designation_department_id`),
  ADD UNIQUE KEY `designation_id` (`designation_id`,`role_id`,`department_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `AK` (`designation_id`,`role_id`,`department_id`),
  ADD KEY `fk_roles_designations_department_created_by` (`created_by`),
  ADD KEY `fk_roles_designations_department_updated_by` (`updated_by`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `task_flow_id` (`task_flow_id`),
  ADD KEY `attachement_id` (`attachment_id`),
  ADD KEY `task_assigned_to_user_role_designation_department_id` (`task_assigned_to_user_role_designation_department_id`),
  ADD KEY `fk_tasks_created_by` (`created_by`),
  ADD KEY `fk_tasks_updated_by` (`updated_by`),
  ADD KEY `fk_parent_task_id` (`parent_task_id`);

--
-- Indexes for table `task_flows`
--
ALTER TABLE `task_flows`
  ADD PRIMARY KEY (`task_flow_id`),
  ADD KEY `created_by_user_role_designation_department_id` (`created_by_user_role_designation_department_id`),
  ADD KEY `AK` (`task_flow_title`),
  ADD KEY `fk_task_flows_created_by` (`created_by`),
  ADD KEY `fk_task_flows_updated_by` (`updated_by`);

--
-- Indexes for table `task_flow_steps`
--
ALTER TABLE `task_flow_steps`
  ADD PRIMARY KEY (`task_flow_step_id`),
  ADD KEY `step_assigned_to_role_department_id` (`step_assigned_to_role_department_id`),
  ADD KEY `fk_task_flow_steps_created_by` (`created_by`),
  ADD KEY `fk_task_flow_steps_updated_by` (`updated_by`);

--
-- Indexes for table `task_history`
--
ALTER TABLE `task_history`
  ADD PRIMARY KEY (`task_history_id`),
  ADD KEY `task_flow_step_id` (`task_flow_step_id`),
  ADD KEY `action_by_user_role_designation_department_id` (`action_by_user_role_designation_department_id`),
  ADD KEY `AK` (`task_id`,`task_flow_step_id`,`action`),
  ADD KEY `fk_task_history_created_by` (`created_by`),
  ADD KEY `fk_task_history_updated_by` (`updated_by`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`template_id`),
  ADD KEY `created_by_user_designation_department_id` (`created_by_user_designation_department_id`),
  ADD KEY `AK` (`template_title`),
  ADD KEY `fk_templates_created_by` (`created_by`),
  ADD KEY `fk_templates_updated_by` (`updated_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_created_by` (`created_by`),
  ADD KEY `fk_users_updated_by` (`updated_by`);

--
-- Indexes for table `user_devices`
--
ALTER TABLE `user_devices`
  ADD PRIMARY KEY (`user_device_id`),
  ADD KEY `AK` (`user_id`,`device_token`),
  ADD KEY `fk_user_devices_created_by` (`created_by`),
  ADD KEY `fk_user_devices_updated_by` (`updated_by`);

--
-- Indexes for table `user_device_notifications`
--
ALTER TABLE `user_device_notifications`
  ADD PRIMARY KEY (`user_device_notification_id`),
  ADD KEY `notification_id` (`notification_id`),
  ADD KEY `AK` (`user_device_id`,`notification_id`),
  ADD KEY `fk_user_device_notifications_created_by` (`created_by`),
  ADD KEY `fk_user_device_notifications_updated_by` (`updated_by`);

--
-- Indexes for table `user_roles_designations_department`
--
ALTER TABLE `user_roles_designations_department`
  ADD PRIMARY KEY (`user_role_designation_department_id`),
  ADD KEY `fk_user_roles_designations_department_created_by` (`created_by`),
  ADD KEY `fk_user_roles_designations_department_updated_by` (`updated_by`),
  ADD KEY `role_designation_department_id` (`role_designation_department_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_role_designation_permissions`
--
ALTER TABLE `user_role_designation_permissions`
  ADD PRIMARY KEY (`user_role_designation_permission_id`),
  ADD UNIQUE KEY `user_role_designation_department_id` (`user_role_designation_department_id`,`permission_id`),
  ADD UNIQUE KEY `user_role_designation_department_id_2` (`user_role_designation_department_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`),
  ADD KEY `AK` (`user_role_designation_department_id`,`permission_id`),
  ADD KEY `fk_user_role_designation_permissions_created_by` (`created_by`),
  ADD KEY `fk_user_role_designation_permissions_updated_by` (`updated_by`);

--
-- Indexes for table `versions`
--
ALTER TABLE `versions`
  ADD PRIMARY KEY (`version_id`),
  ADD KEY `fk_versions_created_by` (`created_by`),
  ADD KEY `fk_versions_updated_by` (`updated_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `attachment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatting_groups`
--
ALTER TABLE `chatting_groups`
  MODIFY `chatting_group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatting_group_members`
--
ALTER TABLE `chatting_group_members`
  MODIFY `chatting_group_member_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `device_otp`
--
ALTER TABLE `device_otp`
  MODIFY `device_otp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dynamic_attachments`
--
ALTER TABLE `dynamic_attachments`
  MODIFY `dynamic_attachment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_groups`
--
ALTER TABLE `permission_groups`
  MODIFY `permission_group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_groups_permissions`
--
ALTER TABLE `permission_groups_permissions`
  MODIFY `permission_group_permission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `platforms`
--
ALTER TABLE `platforms`
  MODIFY `platform_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `platform_versions`
--
ALTER TABLE `platform_versions`
  MODIFY `platform_version_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_designations_department`
--
ALTER TABLE `roles_designations_department`
  MODIFY `role_designation_department_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_flows`
--
ALTER TABLE `task_flows`
  MODIFY `task_flow_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_flow_steps`
--
ALTER TABLE `task_flow_steps`
  MODIFY `task_flow_step_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_history`
--
ALTER TABLE `task_history`
  MODIFY `task_history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `template_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_devices`
--
ALTER TABLE `user_devices`
  MODIFY `user_device_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_device_notifications`
--
ALTER TABLE `user_device_notifications`
  MODIFY `user_device_notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles_designations_department`
--
ALTER TABLE `user_roles_designations_department`
  MODIFY `user_role_designation_department_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role_designation_permissions`
--
ALTER TABLE `user_role_designation_permissions`
  MODIFY `user_role_designation_permission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `versions`
--
ALTER TABLE `versions`
  MODIFY `version_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `fk_attachments_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_attachments_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `chatting_groups`
--
ALTER TABLE `chatting_groups`
  ADD CONSTRAINT `fk_chatting_groups_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_chatting_groups_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `chatting_group_members`
--
ALTER TABLE `chatting_group_members`
  ADD CONSTRAINT `chatting_group_members_ibfk_1` FOREIGN KEY (`user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `chatting_group_members_ibfk_2` FOREIGN KEY (`chatting_group_permission_id`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `chatting_group_members_ibfk_3` FOREIGN KEY (`chatting_group_id`) REFERENCES `chatting_groups` (`chatting_group_id`),
  ADD CONSTRAINT `fk_chatting_group_members_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_chatting_group_members_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_departments_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_departments_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `designations`
--
ALTER TABLE `designations`
  ADD CONSTRAINT `fk_designations_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_designations_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `device_otp`
--
ALTER TABLE `device_otp`
  ADD CONSTRAINT `device_otp_ibfk_1` FOREIGN KEY (`user_device_id`) REFERENCES `user_devices` (`user_device_id`),
  ADD CONSTRAINT `fk_device_otp_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_device_otp_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `dynamic_attachments`
--
ALTER TABLE `dynamic_attachments`
  ADD CONSTRAINT `fk_dynamic_attachments_attachment_id` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`attachment_id`),
  ADD CONSTRAINT `fk_dynamic_attachments_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_dynamic_attachments_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_messages_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`recepient_chatting_group_id`) REFERENCES `chatting_groups` (`chatting_group_id`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`recepient_user_role_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`sent_by_user_role_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_notifications_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`sent_to_user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `fk_permissions_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_permissions_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `permission_groups`
--
ALTER TABLE `permission_groups`
  ADD CONSTRAINT `fk_permission_groups_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_permission_groups_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `permission_groups_permissions`
--
ALTER TABLE `permission_groups_permissions`
  ADD CONSTRAINT `fk_permission_groups_permissions_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_permission_groups_permissions_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `permission_groups_permissions_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `permission_groups` (`permission_group_id`),
  ADD CONSTRAINT `permission_groups_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`);

--
-- Constraints for table `platforms`
--
ALTER TABLE `platforms`
  ADD CONSTRAINT `fk_platforms_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_platforms_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `platform_versions`
--
ALTER TABLE `platform_versions`
  ADD CONSTRAINT `fk_platform_versions_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_platform_versions_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `platform_versions_ibfk_1` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`),
  ADD CONSTRAINT `platform_versions_ibfk_2` FOREIGN KEY (`version_id`) REFERENCES `versions` (`version_id`);

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `fk_roles_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_roles_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_senior_role` FOREIGN KEY (`senior_role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `roles_designations_department`
--
ALTER TABLE `roles_designations_department`
  ADD CONSTRAINT `fk_roles_designations_department_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_roles_designations_department_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `roles_designations_department_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `roles_designations_department_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designations` (`designation_id`),
  ADD CONSTRAINT `roles_designations_department_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fk_parent_task_id` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks` (`task_id`),
  ADD CONSTRAINT `fk_tasks_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_tasks_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`task_flow_id`) REFERENCES `task_flows` (`task_flow_id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`attachment_id`),
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`task_assigned_to_user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `task_flows`
--
ALTER TABLE `task_flows`
  ADD CONSTRAINT `fk_task_flows_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_task_flows_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `task_flows_ibfk_1` FOREIGN KEY (`created_by_user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `task_flow_steps`
--
ALTER TABLE `task_flow_steps`
  ADD CONSTRAINT `fk_task_flow_steps_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_task_flow_steps_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `task_flow_steps_ibfk_1` FOREIGN KEY (`task_flow_id`) REFERENCES `task_flows` (`task_flow_id`),
  ADD CONSTRAINT `task_flow_steps_ibfk_2` FOREIGN KEY (`step_assigned_to_role_department_id`) REFERENCES `roles_designations_department` (`role_designation_department_id`);

--
-- Constraints for table `task_history`
--
ALTER TABLE `task_history`
  ADD CONSTRAINT `fk_task_history_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_task_history_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `task_history_ibfk_1` FOREIGN KEY (`task_flow_step_id`) REFERENCES `task_flow_steps` (`task_flow_step_id`),
  ADD CONSTRAINT `task_history_ibfk_2` FOREIGN KEY (`action_by_user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `task_history_ibfk_3` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);

--
-- Constraints for table `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `fk_templates_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_templates_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`created_by_user_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_users_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `user_devices`
--
ALTER TABLE `user_devices`
  ADD CONSTRAINT `fk_user_devices_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_user_devices_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `user_devices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_device_notifications`
--
ALTER TABLE `user_device_notifications`
  ADD CONSTRAINT `fk_user_device_notifications_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_user_device_notifications_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `user_device_notifications_ibfk_1` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`notification_id`),
  ADD CONSTRAINT `user_device_notifications_ibfk_2` FOREIGN KEY (`user_device_id`) REFERENCES `user_devices` (`user_device_id`);

--
-- Constraints for table `user_roles_designations_department`
--
ALTER TABLE `user_roles_designations_department`
  ADD CONSTRAINT `fk_urdd_rdd_id` FOREIGN KEY (`role_designation_department_id`) REFERENCES `roles_designations_department` (`role_designation_department_id`),
  ADD CONSTRAINT `fk_urdd_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_user_roles_designations_department_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_user_roles_designations_department_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `user_role_designation_permissions`
--
ALTER TABLE `user_role_designation_permissions`
  ADD CONSTRAINT `fk_user_role_designation_permissions_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_user_role_designation_permissions_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `user_role_designation_permissions_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `user_role_designation_permissions_ibfk_2` FOREIGN KEY (`user_role_designation_department_id`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);

--
-- Constraints for table `versions`
--
ALTER TABLE `versions`
  ADD CONSTRAINT `fk_versions_created_by` FOREIGN KEY (`created_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`),
  ADD CONSTRAINT `fk_versions_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_roles_designations_department` (`user_role_designation_department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
